const express = require('express')

const fs = require('fs')
const path = require('path')

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

const app = express()

module.exports = app
