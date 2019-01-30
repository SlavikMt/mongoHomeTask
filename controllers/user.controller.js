const User = require('../models/user.model');

module.exports.createUser = function(req, res) {
    let user = new User({
        _id: new mongoose.Types.ObjectId(),
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
        res.send('User created')
    })
}

module.exports.detailsUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        res.send(user)
    })
}


module.exports.updateUser = function(res, req) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body },
        (err, user) => {
            if (err) return next(err);
            res.send('user updated')
        })
}

module.exports.deleteUser = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};