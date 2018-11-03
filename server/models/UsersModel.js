'use strict'
function UsersDAO(model) {
    this.model = model
}

UsersDAO.prototype.find = function(query, callback) {
    this.model.find(query).exec(callback)
}
UsersDAO.prototype.findById = function(_id, callback) {
    this.model.findOne({ _id: _id }).exec(callback)
}
UsersDAO.prototype.create = function(data, callback) {
    const model = new this.model(data)
    model.save((err, result) => {
        callback(err, result)
    })
}
UsersDAO.prototype.update = function(_id, data, callback) {
    const query = { _id: _id }
    this.model.updateOne(query, data).exec((err, result) => {
        callback(err, result)
    })
}

module.exports = mongoose => {
    const User = mongoose.model('User', {
        username: String,
        email: String,
        password: String,
        battletag: String,
        points:  {
            history: [Number],
            ratings: [Number],
            rating: Number
        }
    })
    return new UsersDAO(User)
}