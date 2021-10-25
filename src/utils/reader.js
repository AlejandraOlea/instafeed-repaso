const fs = require('fs')
const { promisify } = require('util')
const readerPromise = promisify(fs.readFile)

const reader = async (path) => {
  const data = await readerPromise(path, 'utf-8')
  return data
}

module.exports = reader
