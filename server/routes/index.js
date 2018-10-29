const express = require('express'),
    router = express.Router()

router.get('/', (req, res) => {
    res.status(201)
    res.json({ user: 'matheusboari', email: 'matheusboari@gmail.com' })
})

//users
router.use('/users', require('./users'))

module.exports = router