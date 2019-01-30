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