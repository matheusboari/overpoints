'use strict'
function UsersDAO(model) {
    this.model = model
}

UsersDAO.prototype.find = function(query, callback) {
    this.model.find(query).exec(callback)
}
UsersDAO.prototype.findOne = function(_id, callback) {
    const query = { _id: _id }
    this.model.findOne(query).exec(callback)
}
UsersDAO.prototype.create = function(data, callback) {
    const model = new this.model(data)
    model.save((err, result) => {
        callback(err, result)
    })
}
UsersDAO.prototype.update = function(_id, data, callback) {
    const query = { _id: _id }
    this.model.update(query, data).exec((err, result) => {
        callback(err, result)
    })
}
UsersDAO.prototype.remove = function(_id, callback) {
    const query = { _id: _id }
    this.model.remove(query).exec((err, result) => {
        callback(err, result)
    })
}

module.exports = mongoose => {
    const User = mongoose.model('User', {
        username: String,
        email: String,
        password: String
    })
    return new UsersDAO(User)
}