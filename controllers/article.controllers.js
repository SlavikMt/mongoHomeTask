const Article = require('../models/article.model');





module.exports.findArticles = function(req, res) {
    Article
        .find({ owner: user._id })
        .populate('user')
        .exec(function(err, articles) {
            if (err) return err;
            res.send(articles)
        })


}

module.exports.createArticle = function(req, res) {
    let article = new Article({
        title: req.body.title,
        subtitle: req.body.subtitle,
        owner: user._id,
        category: req.body.category
    })
    article.save((err) => {
        if (err) return next(err);
        res.send('Article created')
    })
}


module.exports.updateArticle = function(res, req) {
    Article.findByIdAndUpdate(req.params.id, { $set: req.body },
        (err, article) => {
            if (err) return next(err);
            res.send('article updated')
        })
}

module.exports.findByFilter = function(req, res) {
    var roles = ['title', 'subtitle', 'description', 'owner', 'category', 'createdAt', 'updatedAt'];
    Article.find()
        .populate('roles', null, { name: { $in: roles } })
        .sort({ '_id': 1 })
        .exec(function(err, articles) {
            articles = articles.filter(function(articles) {
                return articles.roles.length;
            });
            res.send(articles);
        });
}


module.exports.deleteArticle = function(req, res) {
    Article.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};