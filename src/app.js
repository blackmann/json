const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const utils = require('../utils')

const data = {}

// walk through the db directory and create db
// from each dir, making use of the path
function walk(top, data) {
  const stat = fs.statSync(top)

  if (stat.isDirectory()) {
    const dir = fs.opendirSync(top).readSync()

    const files = fs.readdirSync(top)

    files.forEach((f) => {
      const next = path.resolve(__dirname, top, f)

      if (fs.statSync(next).isDirectory()) {
        data[dir.name] = {}
        walk(next, data[dir.name])
      } else {
        walk(next, data)
      }
    })
  }

  if (stat.isFile()) {
    const ext = path.extname(top)
    const fn = path.basename(top, ext)

    data[fn] = JSON.parse(fs.readFileSync(top, 'utf8'))
  }
}

walk(path.resolve(__dirname, '../db'), data)

const router = express.Router()

router.all(/\w+/,
  (req, res) => {
    const s = req.path.split('/')

    let rData = data

    try {
      s.slice(1).forEach((cursor) => {
        // to accommodate trailing slash
        if (cursor) {
          rData = rData[cursor]
        }
      })

      if (!rData) {
        throw Error('Not found')
      }

      const params = new URLSearchParams(querystring.stringify(req.query))
      if (Array.isArray(rData)) {
        for (const [k, v] of params) {
          rData = rData.filter((it) => {
            const d = utils.slice(it, k)

            return d.matcher(d.value, v)
          })
        }
      }

      console.log(`RES: ${req.path}?${params.toString()} 200 ${rData.toString().length}`)
      res.json(rData || {})
    } catch (e) {
      res.status(404)
      res.json({})

      console.log(`ERR: ${req.path} 404 `)
    }
  })

const app = express()

app.use(cors())
app.use('/', router)

module.exports = app
