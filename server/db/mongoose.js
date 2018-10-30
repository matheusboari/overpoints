const mongoose = require('mongoose'),
    debug = require('debug')('overpoints:db'),
    config = require('config')

'use strict'
mongoose.connect('', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => {
    debug(err)
})
db.once('open', callback => {
    debug('Connected to mongodb')
})

module.exports = mongoose