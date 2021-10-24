const fs = require('fs')

const writeDb = async (item) => {
  fs.writeFile('./src/data/db.json', item, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log(err)
    }
    if (data) {
      console.log('succes')
    }
  })
}
const writeInvalid = async (item) => {
  fs.writeFile('./src/data/invalid.json', item, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log(err)
    }
    if (data) {
      console.log('SUCCES')
    }
  })
}

module.exports = { writeDb, writeInvalid }
