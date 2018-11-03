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

UsersController.prototype.getAll = function(req, res, next) {
    this.model.findAsync({})
        .then(data => {
            res.json(data)
        })
        .catch(next)
}
UsersController.prototype.getById = function(req, res, next) {
    const _id = req.params._id
    this.model.findByIdAsync(_id)
        .then(handleNotFound)
        .then(data => {
            res.json(data)
        })
        .catch(next)
}
UsersController.prototype.login = function(req, res, next) {
    const body = req.body
    this.model.findAsync({username: body.username})
    .then(data => {
        if(data.length == 0) {
            return res.json({ status: false, details: 'User not found' })
        } else return res.json({ status: true, data: data })
    })
}
UsersController.prototype.register = function(req, res, next) {
    const body = req.body
    
    this.model.findAsync({username: body.username})
    .then(data => {
        if(data.length == 0) {
            this.model.findAsync({email: body.email})
            .then(data => {
                if(data.length == 0) {
                    this.model.createAsync(body)
                    .then((err, data) => {
                        return res.json({ status: true})
                    })
                    .catch(next)
                } else {
                    return res.json({ status: false, details: 'E-mail is already used' })
                }
            })
        } else {
            return res.json({ status: false, details: 'Username is already used' })
        }
    })
}
UsersController.prototype.update = function(req, res, next) {
    const _id = req.params._id,
        body = req.body
    this.model.updateAsync(_id, body)
        .then((err, data) => {
            res.json({ status: true })
        })
        .catch(() => {
            res.json({ status: false })
        })
}

UsersController.prototype.win = function(req, res, next) {
    const _id = req.params._id,
        body = req.body
    this.model.updateAsync(_id, body)
        .then((err, data) => {
            res.json({ status: true })
        })
        .catch(() => {
            res.json({ status: false })
        })
}

module.exports = (UsersModel) => {
    return new UsersController(UsersModel)
}