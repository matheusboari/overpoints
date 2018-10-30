const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//router
app.use('/api/v1/', require('./routes'))

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