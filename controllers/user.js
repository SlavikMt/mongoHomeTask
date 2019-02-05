const mongoose = require('mongoose');
const User = require('../models/userModel');
const Article = require('../models/articleModel');

module.exports.createUser = function(req, res, next) {
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
        res.send(user);
    })
}

module.exports.detailsUser = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        res.send(user)
    })
}


module.exports.updateUser = function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body },
        (err, user) => {
            if (err) return next(err);
            res.send(user)
        })
}

module.exports.deleteUser = function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted user with id ' + req.params.id);
    })
};

module.exports.getArticles = function(req, res, next) {
    Article
        .find({ owner: req.params.id })
        .exec(function(err, articles) {
            if (err) return err;
            res.send(articles)
        })
}