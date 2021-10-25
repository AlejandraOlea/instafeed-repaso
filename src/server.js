const http = require('http')
const reader = require('./utils/reader')

const server = http.createServer(async (req, res) => {
  let data = await reader(`${__dirname}/data/db.json`)
  res.write(data)
  res.end()
})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening for requests on port 8000')
})
