// Max read size 8kb
const MAX_READ_SIZE = 8192
const headerRegx = /(.[^:]*):(.*)/
const fs = require('fs')
const _s = require('string')

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
        .split(`\n`)
        .filter(item => item)
      fs.closeSync(openfile)

      const headers = lines.map(item => {
        const match = item.match(headerRegx)
        if (match && match[1] && match[2]) {
          return {
            key: _s(match[1]).trim().s,
            value: _s(match[2]).trim().s
          }
        }
        return undefined
      }).filter(item => item)

      const finalHeaders = {}
      headers.forEach(item => {
        finalHeaders[_s(item.key).slugify().camelize().s] = item.value
      })
      Object.defineProperty(finalHeaders, '$origins', {
        value: () => headers
      })
      resolve(finalHeaders)
    })
  })
}
