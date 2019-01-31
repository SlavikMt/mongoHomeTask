const Article = require('../models/article.model');





module.exports.findArticles = function(req, res) {
    Article
        .find({ user: user._id })
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
    var id = req.params.id;
    Article.findById({ _id: id }, function(err, post) {
        if (err) res.json({ message: 'There is not a article with that id.' })

        post.save(function(err) {
            if (err) res.json({
                message: "There seems to be some err in updating your article."
            });

            res.json({ message: 'Article successfully updated.', article: article });
        });
    });
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
    var id = req.params.id;
    Article.remove({ _id: id }, function(err) {
        if (err) res.json({ message: 'There is not a article with that id.' })
        res.json({ message: 'Article has been successfully deleted' });
    });
};