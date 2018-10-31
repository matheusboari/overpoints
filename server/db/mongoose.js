const mongoose = require('mongoose'),
    debug = require('debug')('overpoints:db'),
    config = require('config')

'use strict'
mongoose.connect('mongodb://master:123mudar@ds039960.mlab.com:39960/overpointsdb', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => {
    debug(err)
})
db.once('open', callback => {
    debug('Connected to mongodb')
})

module.exports = mongoose