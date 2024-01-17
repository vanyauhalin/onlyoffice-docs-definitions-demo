// @ts-check

import { spawn } from "node:child_process"
import { createReadStream, createWriteStream } from "node:fs"
import { mkdir, mkdtemp, open, writeFile } from "node:fs/promises"
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
import parser from "stream-json"

const root = fileURLToPath(new URL(".", import.meta.url))
const make = sade("./makefile.js")

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

make
  .command("build")
  .action(async () => {
    // todo: rewrite it.
    const rawMeta = await fetch("https://raw.githubusercontent.com/vanyauhalin/onlyoffice-docs-definitions-demo/dist/meta.json")
    const meta = await rawMeta.json()

    const rawSDKJS = await fetch("https://api.github.com/repos/ONLYOFFICE/sdkjs/commits")
    const sdkjs = await rawSDKJS.json()
    const sdkjsSHA = sdkjs[0].sha

    const rawSDKJSForms = await fetch("https://api.github.com/repos/ONLYOFFICE/sdkjs-forms/commits")
    const sdkjsForms = await rawSDKJSForms.json()
    const sdkjsFormsSHA = sdkjsForms[0].sha

    const hasUpdate = !(meta["sdkjs"] === sdkjsSHA && meta["sdkjs-forms"] === sdkjsFormsSHA)
    if (!hasUpdate) {
      console.log("No update")
      return
    }

    const tmp = join(tmpdir(), "onlyoffice-docs-definitions-demo")
    const temp = await mkdtemp(tmp)
    const dist = join(root, "dist")
    await mkdir(dist, { recursive: true })

    await Promise.all(Object.entries(repos).map(async ([repo, files]) => {
      // todo: common...
      const commit = repo === "sdkjs" ? sdkjsSHA : sdkjsFormsSHA

      const inputDir = join(temp, repo)
      await mkdir(inputDir)
      await Promise.all(files.map(async (file) => {
        const n = dirname(file)
        const d = join(inputDir, n)
        await mkdir(d, { recursive: true })
        const u = `https://raw.githubusercontent.com/ONLYOFFICE/${repo}/${commit}/${file}`
        const i = join(inputDir, file)
        await downloadFile(u, i)
      }))

      const o0 = join(temp, `${repo}0.json`)
      const w = createWriteStream(o0)
      await new Promise((resolve, reject) => {
        const e = spawn("./node_modules/.bin/jsdoc", [inputDir, "--explain", "--recurse"])
        e.stdout.on("data", (chunk) => {
          w.write(chunk)
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

      const o1 = join(temp, `${repo}1.json`)
      await new Promise((res, rej) => {
        const l = new Chain([
          createReadStream(o0),
          parser(),
          new StreamArray(),
          (data) => {
            const { value } = data
            if (Object.hasOwn(value, "memberof") && value.memberof.startsWith("<anonymous>")) {
              return undefined
            }
            if (Object.hasOwn(value, "undocumented") && value.undocumented) {
              return undefined
            }
            if (Object.hasOwn(value, "meta") && Object.hasOwn(value.meta, "path")) {
              // todo: replace master with the commit hash.
              value.meta.path = value.meta.path.replace(inputDir, `https://github.com/onlyoffice/${repo}/blob/${commit}`)
            }
            if (Object.hasOwn(value, "files")) {
              value.files = value.files.map((file) => (
                file.replace(inputDir, `https://github.com/onlyoffice/${repo}/blob/${commit}`)
              ))
            }
            return value
          },
          new Disassembler(),
          new Stringer({ makeArray: true }),
          createWriteStream(o1)
        ])
        l.on("finish", () => {
          const o2 = join(dist, `${repo}.json`)
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

    const mf = join(dist, "meta.json")
    const mo = {
      "sdkjs": sdkjsSHA,
      "sdkjs-forms": sdkjsFormsSHA
    }
    await writeFile(mf, JSON.stringify(mo, undefined, 2))

    // todo: delete temp.
  })

function downloadFile(u, f) {
  return new Promise((resolve, reject) => {
    http.get(u, async (res) => {
      const file = await open(f, "w")
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

make.parse(argv)
