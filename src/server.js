const http = require('http')
const reader = require('./utils/reader')
const url = require('url')

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-type', 'application/json')
  let data = await reader(`${__dirname}/data/db.json`)
  let queryString = url.parse(req.url, true).query
  //   console.log('QUERY STRING', queryString)
  //   console.log(Object.keys(req))
  console.log('url==', req.url.split('?'[1]))
  switch (true) {
    case req.url === '/articles':
      try {
        res.statusCode = 200
        res.write(data)
        res.end()
        break
      } catch (err) {
        console.log(err)
      }
    case req.url === '/author':
      try {
        res.statusCode = 200
        res.write(data)
        res.end()
        break
      } catch (err) {
        console.log(err)
      }
    case typeof queryString.id !== 'string':
      res.statusCode = 400
      res.write('not valid ID')
      res.end()
      break

    case typeof queryString.id === 'string':
      const founded = JSON.parse(data).find((e) => e.id === queryString.id)
      console.log('founded es', founded)
      if (founded === undefined) {
        res.statusCode = 404
        res.write('Not found')
        res.end()
        break
      }
      res.write(JSON.stringify(founded))
      res.end()
      break

    default:
      console.log('URL PARSE', url.parse(req.url, true).query.id)
      res.write('Prompt url')
      res.end()
      break
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening for requests on port 8000')
})
