// @ts-check

import { spawn } from "node:child_process"
import { Console as NodeConsole } from "node:console"
import { createReadStream, createWriteStream } from "node:fs"
import { mkdir, mkdtemp, open, writeFile, rmdir, rm } from "node:fs/promises"
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
const make = sade("./makefile.js")

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
    console.log("No update")
    return
  }
  const temp = await createTempDir()
  const dist = join(root, "dist")
  console = createConsole(dist)
  console.warn(`Temp dir created at: ${temp}`)
  
  await createMetaJson(dist)
  await processFiles(temp)
  await removeTempDir(temp)
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
  return hasUpdate
}

/**
 * Creates a temporary directory.
 * @returns {Promise<string>} The path of the temporary directory.
 */
async function createTempDir() {
  const tmp = join(tmpdir(), repoName)
  const temp = await mkdtemp(tmp)
  const dist = join(root, "dist")
  await mkdir(dist, { recursive: true })
  return temp
}

/**
 * Creates console.
 * @param {string} dist
 * @returns {object}
 */
function createConsole(dist) {
  const cf = join(dist, "report.log")
  const cs = createWriteStream(cf)
  const c = new Console(cs, cs)
  return c
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
 * @param {string} temp Temp dir path.
 * @returns {Promise<void>}
 */
async function processFiles(temp) {
  const dist = join(root, "dist")
  await Promise.all(Object.entries(repos).map(async ([, commit]) => {
    const inputDir = join(temp, commit.sha)
    await mkdir(inputDir)
    
    await Promise.all(commit.files.map(async (file) => {
      const n = dirname(file)
      const d = join(inputDir, n)
      await mkdir(d, { recursive: true })
      const u = `https://raw.githubusercontent.com/ONLYOFFICE/${commit.repoName}/${commit.sha}/${file}`
      const i = join(inputDir, file)
      await downloadFile(u, i)
      console.warn(`File from "${u}" downloaded to "${i}"`)
    }))

    const o0 = join(temp, `${commit.repoName}0.json`)
    const w = createWriteStream(o0)
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

    const o1 = join(temp, `${commit.repoName}1.json`)
    await new Promise((res, rej) => {
      const l = new Chain([
        createReadStream(o0),
        new Parser(),
        new StreamArray(),
        // to _transform
        (data) => {
          // todo: describe a new schema.
          // https://github.com/jsdoc/jsdoc/blob/main/packages/jsdoc-doclet/lib/schema.js#L87
          const { value } = data
          if (Object.hasOwn(value, "undocumented") && value.undocumented) {
            return undefined
          }
          let path = ""
          let filename = ""
          if (Object.hasOwn(value, "meta") && Object.hasOwn(value.meta, "path")) {
            path = value.meta.path.replace(inputDir, "")
            delete value.meta.path
          }
          if (Object.hasOwn(value, "meta") && Object.hasOwn(value.meta, "filename")) {
            filename = value.meta.filename
            delete value.meta.filename
          }
          let f = join(path, filename)
          if (f.startsWith("/")) {
            f = f.slice(1)
          }
          // see github schema, don't generate manually, fetch from the github api (sure?)
          // https://raw.githubusercontent.com/vanyauhalin/onlyoffice-docs-definitions-demo/dist/meta.json
          const file = `https://api.github.com/repos/onlyoffice/${commit.repoName}/contents/${f}?ref=${commit.sha}`
          if (value.meta !== undefined) {
            // why file? because kind=package has the files property.
            value.meta.file = file
          }
          
          if (Object.hasOwn(value, "meta") && Object.hasOwn(value.meta, "code")) {
            delete value.meta.code
          }
          if (Object.hasOwn(value, "meta") && Object.hasOwn(value.meta, "vars")) {
            delete value.meta.vars
          }
          if (Object.hasOwn(value, "files")) {
            value.files = value.files.map((file) => {
              let f = file.replace(inputDir, "")
              if (f.startsWith("/")) {
                f = f.slice(1)
              }
              return `https://api.github.com/repos/onlyoffice/${commit.repoName}/contents/${f}?ref=${commit.sha}`
            })
          }
          
          if (Object.hasOwn(value, "properties") && value.properties.length === 0) {
            delete value.properties
          }
          if (Object.hasOwn(value, "params") && value.params.length === 0) {
            delete value.params
          }
          
          return value
        },
        new Disassembler(),
        new Stringer({ makeArray: true }),
        createWriteStream(o1)
      ])
      l.on("finish", () => {
        const o2 = join(dist, `${commit.repoName}.json`)
        const w = createWriteStream(o2)
        const s = spawn("jq", [".", o1])
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
  }))
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
 * @param {string} temp Temp dir path.
 * @returns {Promise<void>}
 */
async function removeTempDir(temp) {
  await Promise.all(Object.entries(repos).map(async () => {
    await rm(temp, { recursive: true })
  }))
  console.warn(`Temp dir at ${temp} removed`)
}

main()

