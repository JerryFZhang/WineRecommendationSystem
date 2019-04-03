var express = require('express')
var app = express()
const fs = require('fs');

let rawdata = fs.readFileSync('public/example.json');
let wines = JSON.parse(rawdata);

// Load server config for future deployment
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 4000

var path = require('path')
var cors = require('cors')

// // use it before all route definitions
// app.use(cors({
//   origin: 'http://localhost:3000'
//   // React App destination is on port 3000
//   // make this a config later
// }))
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))

app.get('/wines', (req, res) => {

  //return the placeholder (for now)
  res.send(wines)
})

// `/rocket` endpoint that gets launch data from API
app.get('/wine/:next', (req, res) => {
  res.send(wines)
})

app.get('/wines-temp', (req, res) => {
  var http = require('http');
  var options = {
    host: 'localhost',
    path: '/products',
    port:'3000'

  }
  var request = http.request(options, function (resp) {
    var data = '';
    resp.on('data', function (chunk) {
      data += chunk;
    });
    resp.on('end', function () {
      res.send(data)
      // console.log(data);

    });
  });
  request.on('error', function (e) {
    console.log(e.message);
  });
  request.end();

})



app.listen(PORT, () => console.log(`App Started on Port ${PORT}`))
module.exports = app