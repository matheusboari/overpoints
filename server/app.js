const express = require('express'),
  bodyParser = require('body-parser'),
  app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Origin", "*", "Origin, X-Request-With, Content-Type, Accept")
  next()
})

//router
app.use('/', require('./routes'))

//error handling
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(err.status || 500).json({ err: err.message })
})

module.exports = app