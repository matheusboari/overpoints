'use strict'
function UsersDAO(model) {
    this.model = model
}

UsersDAO.prototype.find = (query, callback) => {
    this.model.find(query).exec(callback)
}
UsersDAO.prototype.findOne = (_id, callback) => {
    const query = { _id: _id }
    this.model.finOne(query).exec(callback)
}
UsersDAO.prototype.create = (data, callback) => {
    const model = new this.model(data)
    model.save((err, result) => {
        callback(err, result)
    })
}
UsersDAO.prototype.update = (_id, data, callback) => {
    const query = { _id: _id }
    this.model.update(query, data).exec((err, result) => {
        callback(err, result)
    })
}
UsersDAO.prototype.remove = (_id, callback) => {
    const query = { _id: _id }
    this.model.remove(query).exec((err, result) => {
        callback(err, result)
    })
}

module.exports = mongoose => {
    const User = mongoose.model('User', {
        username: String,
        email: String,
        senha: String
    })
    return new UsersDAO(User)
}