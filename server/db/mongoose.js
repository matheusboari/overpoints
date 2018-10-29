const mongoose = require('mongoose'),
    debug = require('debug')('overpoints:db'),
    config = require('config')
'use strict'
const mongoDB = 'mongodb://teste:teste123@ds039960.mlab.com:39960/overpointsdb'
mongoose.connect(mongoDB, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => {
    debug(err)
})
db.once('open', callback => {
    debug('Connected to mongodb')
})

module.exports = mongoose