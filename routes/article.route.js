const express = require('express');
const router = express.Router();


const article_controller = require('../controllers/article.controllers');



router.get('/user/:id/articles', user_controller.findArticles);
router.post('articles/create', article_controller.createArticle)




module.exports = router;