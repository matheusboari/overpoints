const express = require('express'),
    router = express.Router()

const mongoose = require('../db/mongoose')
const UsersModel = require('../models/UsersModel')(mongoose)
const UsersController = require('../controllers/UsersController')(UsersModel)

router.get('/', UsersController.getAll.bind(UsersController))
router.get('/:id', UsersController.getById.bind(UsersController))
router.post('/', UsersController.create.bind(UsersController))
router.put('/:id', UsersController.update.bind(UsersController))
router.delete('/:id', UsersController.remove.bind(UsersController))

module.exports = router