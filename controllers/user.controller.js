const User = require('../models/user.model');

module.exports.create = function(req, res) {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        numberOfArticles: req.body.numberOfArticles,
        nickname: req.body.nickname

    })
    user.save((err) => {
        if (err) {
            return next(err)
        }
        res.send('User created successful')
    })
}

exports.details = function(res, req) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        res.send(user)
    })
}

module.exports.update = function(res, req) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body },
        (err, user) => {
            if (err) return next(err);
            res.send('user updated')
        })
}

exports.delete = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};