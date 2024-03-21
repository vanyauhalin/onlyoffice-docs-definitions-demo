// @ts-check

/**
 * @typedef {import("node:stream").TransformCallback} TransformCallback
 */

import { spawn } from "node:child_process"
import { Console as NodeConsole } from "node:console"
import { createReadStream, createWriteStream } from "node:fs"
import { mkdir, mkdtemp, open, writeFile, rm } from "node:fs/promises"
import http from "node:https"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { argv } from "node:process"
import { fileURLToPath } from "node:url"
import sade from "sade"
import Chain from "stream-chain"
import StreamArray from "stream-json/streamers/StreamArray.js"
import Disassembler from "stream-json/Disassembler.js"
import Stringer from "stream-json/Stringer.js"
import Parser from "stream-json/Parser.js"
import { Transform } from "node:stream"

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
const console = createConsole(root)

const repoName = "onlyoffice-docs-definitions-demo"
const repoOwner = "vanyauhalin"
const repos = {
  sdkjs: {
    repoName: "sdkjs",
    sha: "",
    files: [
      "word/apiBuilder.js",
      "cell/apiBuilder.js",
      "slide/apiBuilder.js",
      "word/api_plugins.js",
      "cell/api_plugins.js",
      "slide/api_plugins.js",
      "common/apiBase_plugins.js",
      "common/plugins/plugin_base_api.js"
    ]
  },
  sdkjsForms: {
    repoName: "sdkjs-forms",
    sha: "",
    files: [
      "apiBuilder.js",
      "apiPlugins.js"
    ]
  }
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
    return
  }

  const context = {}
  context.dist = join(root, "dist")
  await mkdir(context.dist, { recursive: true }) // recursive is necessary, otherwise err File already exists
  const tmp = join(tmpdir(), repoName)
  const temp = await mkdtemp(tmp)
  context.temp = temp
  
  await Promise.all(Object.entries(repos).map(async ([, commit]) => {
    const inputDir = join(context.temp, commit.sha)
    await mkdir(inputDir)
    await downloadFiles(inputDir, commit)

    context.o0 = join(context.temp, `${commit.repoName}0.json`)
    await writeToRawJson(context, inputDir)
    context.o1 = join(context.temp, `${commit.repoName}1.json`)
    await processRawJson(context, inputDir, commit)
  }))

  await removeTempDir(context.temp)
  await createMetaJson(context.dist)
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
  repos.sdkjs.sha = sdkjs[0].sha

  const rawSDKJSForms = await fetch("https://api.github.com/repos/ONLYOFFICE/sdkjs-forms/commits")
  const sdkjsForms = await rawSDKJSForms.json()
  repos.sdkjsForms.sha = sdkjsForms[0].sha

  const hasUpdate = !(meta["sdkjs"] === repos.sdkjs.sha && meta["sdkjs-forms"] === repos.sdkjsForms.sha)
  if(!hasUpdate) {
    console.info("No update")
  }
  return hasUpdate
}

/**
 * Reads raw Json and creates processed Json in dist.
 * @param {object} context
 * @param {string} inputDir
 * @returns {Promise<void>}
 */
async function writeToRawJson(context, inputDir) {
  const w = createWriteStream(context.o0)
  await new Promise((resolve, reject) => {
    const e = spawn("./node_modules/.bin/jsdoc", [inputDir, "--debug", "--explain", "--recurse"])
    e.stdout.on("data", (ch) => {
      // todo: should be a better way.
      const l = ch.toString()
      if (
        l.startsWith("DEBUG:") ||
        l.startsWith(`Parsing ${inputDir}`) ||
        l.startsWith("Finished running")
      ) {
        return
      }
      w.write(ch)
    })
    e.stdout.on("close", () => {
      w.close()
      resolve(undefined)
    })
    e.stdout.on("error", (error) => {
      console.error(error)
      w.close()
      reject(error)
    })
  })
}

/**
 * Reads raw Json and creates processed Json in dist.
 * @param {object} context
 * @param {string} inputDir
 * @param {object} commit
 * @returns {Promise<void>}
 */
async function processRawJson(context, inputDir, commit) {
  await new Promise((res, rej) => {
    const l = new Chain([
      createReadStream(context.o0),
      new Parser(),
      new StreamArray(),
      new ProcessJson(commit, inputDir),
      new Disassembler(),
      new Stringer({ makeArray: true }),
      createWriteStream(context.o1)
    ])
    l.on("finish", () => {
      const o2 = join(context.dist, `${commit.repoName}.json`)
      const w = createWriteStream(o2)
      const s = spawn("jq", [".", context.o1])
      s.stdout.on("data", (chunk) => {
        w.write(chunk)
      })
      s.stdout.on("close", () => {
        w.close()
        res(undefined)
      })
      s.stdout.on("error", (error) => {
        console.error(error)
        w.close()
        rej(error)
      })
    })
  })
}

/**
 * Downloads a file.
 * @param {string} url Download URL.
 * @param {string} path Local path to downloaded file
 * @returns {Promise<boolean>}
 */
function downloadFile(url, path) {
  return new Promise((resolve, reject) => {
    http.get(url, async (res) => {
      const file = await open(path, "w")
      const stream = file.createWriteStream()
      res.pipe(stream);
      stream.on("finish", () => {
        stream.close(() => {
          file.close()
          resolve(true)
        })
      })
      stream.on("error", reject)
    })
  })
}

/**
 * Downloads files in repo.
 * @param {string} inputDir Download URL.
 * @param {object} commit Local path to downloaded file
 * @returns {Promise<void>}
 */
async function downloadFiles(inputDir, commit) {
  await Promise.all(commit.files.map(async (file) => {
    const n = dirname(file)
    const d = join(inputDir, n)
    await mkdir(d, { recursive: true })
    const u = `https://raw.githubusercontent.com/ONLYOFFICE/${commit.repoName}/${commit.sha}/${file}`
    const i = join(inputDir, file)
    await downloadFile(u, i)
  }))
}

class ProcessJson extends Transform {
  /**
   * @param {object} commit
   * @param {string} inputDir
   */
  constructor(commit, inputDir) {
    super({ objectMode: true })
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
    const file = `https://api.github.com/repos/onlyoffice/${this.commit.repoName}/contents/${f}?ref=${this.commit.sha}`
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
        return `https://api.github.com/repos/onlyoffice/${this.commit.repoName}/contents/${f}?ref=${this.commit.sha}`
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
 * @param {string} temp Temp dir path.
 * @returns {Promise<void>}
 */
async function removeTempDir(temp) {
  await Promise.all(Object.entries(repos).map(async () => {
    await rm(temp, { recursive: true })
  }))
}

/**
 * Creates meta at dist.
 * @param {string} dist
 * @returns {Promise<void>}
 */
async function createMetaJson(dist) {
  const mf = join(dist, "meta.json")
  const mo = {
    "sdkjs": repos.sdkjs.sha,
    "sdkjs-forms": repos.sdkjsForms.sha,
  }
  await writeFile(mf, JSON.stringify(mo, undefined, 2))
}

/**
 * Creates console.
 * @param {string} dir
 * @returns {object}
 */
function createConsole(dir) {
  const cf = join(dir, "report.log")
  const cs = createWriteStream(cf)
  const c = new Console(cs, cs)
  return c
}

main()