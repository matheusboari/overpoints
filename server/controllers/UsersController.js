'use strict'
const debug = require('debug')('overpointsdb:controller'),
    Promise = require('bluebird')

const handleNotFound = data => {
    if(!data) {
        const err = new Error('Not Found')
        err.status = 404
        throw err
    }
    return data
}

function UsersController(UsersModel) {
    this.model = Promise.promisifyAll(UsersModel)
}

UsersController.prototype.getAll = (req, res, next) => {
    this.model.findAsync({}) 
        .then(data => {
            res.json(data)
        })
        .catch(next)
}
UsersController.prototype.getById = (req, res, next) => {
    const _id = req.params._id
    this.model.findOneAsync((_id)) 
        .then(handleNotFound)
        .then(data => {
            res.json(data)
        })
        .catch(next)
}
UsersController.prototype.create = (req, res, next) => {
    const body = req.body
    this.model.createAsync(body)
    .then((err, data) => {
        res.json(data)
    })
    .catch(next)
}
UsersController.prototype.update = (req, res, next) => {
    const _id = req.params._id,
        body = req.body
    this.model.updateAsync(_id, body)
        .then((err, data) => {
            res.json(data)
        })
        .catch(next)
}
UsersController.prototype.remove = (req, res, next) => {
    const _id = req.params._id
    this.model.removeAsync(_id) 
    .then((err, data) => {
        res.json(data)
    })
    .catch(next)
}

module.exports = UsersModel => {
    return new UsersController(UsersModel)
}