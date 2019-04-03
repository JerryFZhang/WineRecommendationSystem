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
  //return all 
  const json = {
    "wines": [{
      "id": "016840",
      "name": "Bolla Valpolicella Classico",
      "info": {
        "price": "$14.95",
        "size": "750 mL",
        "description": "Bolla wines reflect true Italian style, and express the terroir of the Veneto region. Made from hand-harvested grapes, and aged for two months in oak. Enjoy aromas and flavours of cherry, raspberry and toasted nuts, with hints of licorice and spice. Serve with pizza, pasta or roast chicken with pomegranate glaze.",
        "alcohol": "12.5%",
        "location": "Veneto, Italy",
        "sugar": "4 g/L"
      }
    }]
  }
  //return the placeholder (for now)
  res.send(json)
})

// `/rocket` endpoint that gets launch data from API
app.get('/wine/:next', (req, res) => {
  // if req.params.next exists return the wine only
  // else return "Wine not found"
  const json = {
    "id": "016840",
    "name": "Bolla Valpolicella Classico",
    "info": {
      "price": "$14.95",
      "size": "750 mL",
      "description": "Bolla wines reflect true Italian style, and express the terroir of the Veneto region. Made from hand-harvested grapes, and aged for two months in oak. Enjoy aromas and flavours of cherry, raspberry and toasted nuts, with hints of licorice and spice. Serve with pizza, pasta or roast chicken with pomegranate glaze.",
      "alcohol": "12.5%",
      "location": "Veneto, Italy",
      "sugar": "4 g/L"
    }
  }
  //return the placeholder (for now)
  res.send(json)
})


app.listen(PORT, () => console.log(`App Started on Port ${PORT}`)) 
module.exports = app