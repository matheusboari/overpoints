const express = require('express'),
    router = express.Router()

//users
router.use('/users', require('./users'))

module.exports = router