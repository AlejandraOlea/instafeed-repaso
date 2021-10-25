const fs = require('fs')
const { readdir, readFile } = require('fs')
const { promisify } = require('util')
const promisifiedReadDir = promisify(readdir)
const promisifiedReadFile = promisify(readFile)
const promisifiedWriteFile = promisify(fs.writeFile)
const { writeDb, writeInvalid } = require('./utils/write')

const yup = require('yup')
let dbArray = []
let noValid = []

const validator = (data) => {
  const parseData = JSON.parse(data)

  let schema = yup.object().shape({
    id: yup.string().length(36).required(),
    title: yup.string().min(1).max(255).required(),
    url: yup.string().required(),
    keywords: yup.array().min(1).max(3).required(),
    modifiedAt: yup.date().required(),
    publishedAt: yup.date(),
    author: yup.string().max(100).required(),
    readMins: yup.number().min(1).max(20).required(),
    source: yup.string().required(),
  })

  schema
    .validate(parseData)
    .then(function (valid) {
      dbArray.push(parseData)
      console.log('==DB===', dbArray)
    })
    .catch(function (err) {
      console.log('ERROR DESDE ESQUEMA', err)
      noValid.push(parseData)
    })
}

async function main() {
  try {
    const files = await promisifiedReadDir('./src/dataset', { encoding: 'utf-8' })
    // console.log(files)
    /* leer cada archivo */
    for (let file of files) {
      const fileContent = await promisifiedReadFile(`./src/dataset/${file}`, { encoding: 'utf-8' })
      const isValid = await validator(fileContent)
      // console.log(isValid)
    }
    writeDb(JSON.stringify(dbArray))
    writeInvalid(JSON.stringify(noValid))
  } catch (err) {
    console.log(err)
  }
}
main()
