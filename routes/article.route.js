const express = require('express');
const router = express.Router();


const article_controller = require('../controllers/article.controllers');



router.get('/user/:id/articles', article_controller.findArticles);
router.post('articles/create', article_controller.createArticle)
router.get('/articles', article_controller.findByFilter)
router.delete('/:id/delete', article_controller.deleteArticle);




module.exports = router;