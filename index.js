const fs = require('fs')
const trim = require('trim')
const slugify = require('slugify')

// Max read size 8kb
const MAX_READ_SIZE = 8192
const headerRegx = /(.[^:]*):(.*)/

const camelize = str => {
  return trim(str).replace(/(-|_|\s)+(.)?/g, (mathc, sep, c) => c ? c.toUpperCase() : '')
}

module.exports = filename => {
  return new Promise(resolve => {
    if (!fs.existsSync(filename)) {
      throw new Error('Filename not exists.')
    }

    const openfile = fs.openSync(filename, 'r')
    const buffer = Buffer.alloc(MAX_READ_SIZE)
    fs.read(openfile, buffer, 0, MAX_READ_SIZE, 0, err => {
      if (err) {
        throw err
      }

      const lines = buffer.toString()
        .replace(/\r/g, `\n`)
        .replace(/\u0000/g, '')
        .replace(/\*/g, '')
        .split(`\n`)
        .filter(item => item)
        .map(item => item.trim())
      fs.closeSync(openfile)

      const headers = lines.map(item => {
        const match = item.match(headerRegx)
        if (match && match[1] && match[2]) {
          return {
            key: trim(match[1]),
            value: trim(match[2])
          }
        }
        return undefined
      }).filter(item => item)

      const finalHeaders = {}
      headers.forEach(item => {
        const headerKey = camelize(slugify(item.key.toLowerCase()))
        finalHeaders[headerKey] = item.value
      })
      Object.defineProperty(finalHeaders, '$origins', {
        value: () => headers
      })
      resolve(finalHeaders)
    })
  })
}
