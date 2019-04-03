var express = require('express')
var app = express()

// Load server config for future deployment
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 4000

var path = require('path')
var cors = require('cors')

// use it before all route definitions
app.use(cors({
  origin: 'http://localhost:3000'
  // React App destination is on port 3000
  // make this a config later
}))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/wines', (req, res) => {
  const json = {
    "wines": [{
        "id": 1678,
        "name": "",
        "vidURL": null,
        "infoURL": null,
        "info": {}
    }],
    "total": 181,
    "offset": 0,
    "count": 5
}
  res.send(json)
})

// `/rocket` endpoint that gets launch data from API
app.get('/wine/:next', (req, res) => {
  LaunchJS.get('getLaunches', req.params.next).then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})


app.listen(PORT, () => console.log(`App Started on Port ${PORT}`))
module.exports = app