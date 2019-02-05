const mongoose = require('mongoose');
const Article = require('../models/articleModel');
const User = require('../models/userModel');

module.exports.createArticle = function(req, res, next) {
    // find existing user
    User.findById(req.body.owner, function(err, user) {
        // stop if we can't find such author
        if (err) return next(err);
        
        // create a new article and add ref to the user
        let article = new Article({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            owner: user._id,
            category: req.body.category,
        })
        article.save((err) => {
            if (err) return next(err);

            // update numberOfArticles in the user model
            user.numberOfArticles += 1;

            user.save((err) => {
                res.send(article);
            });
        })
    })
}

module.exports.updateArticle = function(req, res, next) {
    Article.findById(req.params.id)
        .populate('owner')
        .exec((err, article) => {
            if (err) {
                res.json({ message: 'There is not a article with that id.' })
                return next(err);
            }

            if (typeof article.owner === null) {
                // no owner for this article, maybe, show some message
                res.json({ message: 'This article has no owner existing in the DB' });

                return next(err);
            }

            article.set(req.body);

            article.save((err) => {
                // TODO: process error here

                res.json({ message: 'Article successfully updated.', article: article });
            });
        });
}


module.exports.getList = function(req, res, next) {
    Article
        .find(req.query)
        .populate('owner')
        .exec(function(err, articles) {
            if (err) return err;
            res.send(articles)
        })
}


module.exports.deleteArticle = function(req, res, next) {
    Article.findById(req.params.id)
        .populate('owner')
        .exec((err, article) => {
            if (err) {
                res.json({ message: 'There is not a article with that id.' })
                return next(err);
            }

            article.delete();

            if (typeof article.owner !== null) {

                article.owner.numberOfArticles -= 1;

                article.owner.save((err) => {
                    // TODO: catch err
                })
            }

            res.json({ message: 'Article successfully deleted.' });
        });
};