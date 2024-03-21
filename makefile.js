// @ts-check

/**
 * @typedef {import("node:stream").TransformCallback} TransformCallback
 * @typedef {import("node:fs").WriteStream} WriteStream
 */

import { spawn } from "node:child_process"
import { Console as NodeConsole } from "node:console"
import { createReadStream, createWriteStream, existsSync } from "node:fs"
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { argv } from "node:process"
import { finished } from "node:stream/promises"
import { Readable, Transform } from "node:stream"
import { fileURLToPath } from "node:url"
import sade from "sade"
import Chain from "stream-chain"
import StreamArray from "stream-json/streamers/StreamArray.js"
import Disassembler from "stream-json/Disassembler.js"
import Stringer from "stream-json/Stringer.js"
import Parser from "stream-json/Parser.js"

class Console extends NodeConsole {
  /**
   * @param  {...any} data
   * @returns {void}
   */
  info(...data) {
    super.info("info:", ...data)
  }

  /**
   * @param  {...any} data
   * @returns {void}
   */
  warn(...data) {
    super.warn("warn:", ...data)
  }
}

const root = fileURLToPath(new URL(".", import.meta.url))
const console = new Console(process.stdout, process.stderr)

const repoName = "onlyoffice-docs-definitions-demo"
const repoOwner = "vanyauhalin"

const repos = {
  "sdkjs": [
    "word/apiBuilder.js",
    "cell/apiBuilder.js",
    "slide/apiBuilder.js",
    "word/api_plugins.js",
    "cell/api_plugins.js",
    "slide/api_plugins.js",
    "common/apiBase_plugins.js",
    "common/plugins/plugin_base_api.js"
  ],
  "sdkjs-forms": [
    "apiBuilder.js",
    "apiPlugins.js"
  ]
}

/**
 * @param {string} sdkjs
 * @param {string} sdkjsForms
 */
const sha = {
  sdkjs: "",
  sdkjsForms: ""
}

/**
 * @returns {void}
 */
function main() {
  const make = sade("./makefile.js")

  make
    .command("build")
    .action(build)

  make.parse(argv)
}

/**
 * @returns {Promise<void>}
 */
async function build() {
  const hasUpdate = await checkUpdates()
  if (!hasUpdate) {
    console.info("No update")
    return
  }

  const dist = join(root, "dist")
  if (!existsSync(dist)) {
    await(mkdir(dist))
  }
  const tmp = join(tmpdir(), repoName)
  const temp = await mkdtemp(`${tmp}-`)

  await Promise.all(Object.entries(repos).map(async ([repo, files]) => {
    const commit = repo === "sdkjs" ? sha.sdkjs : sha.sdkjsForms
    const inputDir = join(temp, repo)
    await mkdir(inputDir)
    await Promise.all(files.map(async (file) => {
      const n = dirname(file)
      const d = join(inputDir, n)
      await mkdir(d, { recursive: true })
      const u = `https://raw.githubusercontent.com/ONLYOFFICE/${repo}/${commit}/${file}`
      const i = join(inputDir, file)
      await downloadFile(u, i)
      // await appendFile(i, `/** @module ${module(repo)} */`)
    }))

    const o0 = join(temp, `${commit}0.json`)
    const w = createWriteStream(o0)
    await jsdoc(w, inputDir)
    w.close()

    const o1 = join(temp, `${commit}1.json`)
    await new Promise((res, rej) => {
      const l = new Chain([
        createReadStream(o0),
        new Parser(),
        new StreamArray(),
        new ProcessJson(repo, commit, inputDir),
        new Disassembler(),
        new Stringer({ makeArray: true }),
        createWriteStream(o1)
      ])
      l.on("finish", async () => {
        const o2 = join(dist, `${repo}.json`)
        const w = createWriteStream(o2)
        await jq(w, o1)
        w.close()
      })
    })
    await rm(o0)
    await rm(o1)
  }))

  await rm(temp, { recursive: true })
  const mf = join(dist, "meta.json")
  await writeFile(mf, JSON.stringify(sha, undefined, 2))
}

/**
 * Checks for updates.
 * @returns {Promise<boolean>}
 */
async function checkUpdates() {
  const rawMeta = await fetch(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/dist/meta.json`)
  const meta = await rawMeta.json()

  const rawSDKJS = await fetch("https://api.github.com/repos/ONLYOFFICE/sdkjs/commits")
  const sdkjs = await rawSDKJS.json()
  sha.sdkjs = sdkjs[0].sha

  const rawSDKJSForms = await fetch("https://api.github.com/repos/ONLYOFFICE/sdkjs-forms/commits")
  const sdkjsForms = await rawSDKJSForms.json()
  sha.sdkjsForms = sdkjsForms[0].sha

  const hasUpdate = !(meta["sdkjs"] === sha.sdkjs && meta["sdkjs-forms"] === sha.sdkjsForms)
  return hasUpdate
}

/**
 * Downloads a file.
 * @param {string} u The URL of the file to download.
 * @param {string} p The path of the file to save.
 * @returns {Promise<void>}
 */
async function downloadFile(u, p) {
  const res = await fetch(u)
  if (res.body === null) {
    throw new Error("No body")
  }
  const r = Readable.fromWeb(res.body)
  const s = createWriteStream(p)
  const w = r.pipe(s)
  await finished(w)
}

/**
 * @param {WriteStream} w
 * @param {string} from
 * @returns {Promise<void>}
 */
async function jsdoc(w, from) {
  return new Promise((resolve, reject) => {
    const e = spawn("./node_modules/.bin/jsdoc", [from, "--debug", "--explain", "--recurse"])
    e.stdout.on("data", (ch) => {
      // todo: should be a better way.
      const l = ch.toString()
      if (
        l.startsWith("DEBUG:") ||
        l.startsWith(`Parsing ${from}`) ||
        l.startsWith("Finished running")
      ) {
        return
      }
      w.write(ch)
    })
    e.stdout.on("close", () => {
      resolve(undefined)
    })
    e.stdout.on("error", (error) => {
      reject(error)
    })
  })
}

class ProcessJson extends Transform {
  /**
   * @param {string} repo
   * @param {string} commit
   * @param {string} inputDir
   */
  constructor(repo, commit, inputDir) {
    super({ objectMode: true })
    this.repo = repo
    this.commit = commit
    this.inputDir = inputDir
  }
  /**
   * @param {Object} ch
   * @param {TransformCallback} cb
   * @returns {void}
   */
  _transform(ch, _, cb) {
    const { value } = ch
    if ("undocumented" in value && value.undocumented) {

      cb(null)
      return
    }

    let path = ""
    let filename = ""
    if ("meta" in value && "path" in value.meta) {
      // console.info("Path is missing")
      path = value.meta.path.replace(this.inputDir, "")
      delete value.meta.path
    }
    if ("meta" in value && "filename" in value.meta) {
      filename = value.meta.filename
      delete value.meta.filename
    }
    let f = join(path, filename)
    if (f.startsWith("/")) {
      f = f.slice(1)
    }

    // see github schema, don't generate manually, fetch from the github api (sure?)
    // https://raw.githubusercontent.com/vanyauhalin/onlyoffice-docs-definitions-demo/dist/meta.json
    const file = `https://api.github.com/repos/onlyoffice/${this.repo}/contents/${f}?ref=${this.commit}`
    if (value.meta !== undefined) {
      // why file? because kind=package has the files property.
      value.meta.file = file
    }
    if ("meta" in value && "code" in value.meta) {
      delete value.meta.code
    }
    if ("meta" in value && "vars" in value.meta) {
      delete value.meta.vars
    }

    if ("files" in value) {
      value.files = value.files.map((file) => {
        let f = file.replace(this.inputDir, "")
        if (f.startsWith("/")) {
          f = f.slice(1)
        }
        return `https://api.github.com/repos/onlyoffice/${this.repo}/contents/${f}?ref=${this.commit}`
      })
    }

    if ("properties" in value && value.properties.length === 0) {
      delete value.properties
    }
    if ("params" in value && value.params.length === 0) {
      delete value.params
    }

    this.push(value)
    cb(null)
  }
}

/**
 * @param {WriteStream} w
 * @param {string} from
 * @returns {Promise<void>}
 */
async function jq(w, from) {
  return new Promise((res, rej) => {
    const s = spawn("jq", [".", from])
    s.stdout.on("data", (ch) => {
      w.write(ch)
    })
    s.on("close", res)
    s.on("error", rej)
  })
}

main()
