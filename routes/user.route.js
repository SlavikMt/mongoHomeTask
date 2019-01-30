const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user.controller');
const article_controller = require('../controllers/article.controllers');

router.post('/create', user_controller.createUser);
router.get('/:id', user_controller.detailsUser);
router.put('/:id/update', user_controller.updateUser);
router.delete('/:id/delete', user_controller.deleteUser);
router.get('/:id/articles', user_controller.findArticles);



router.post('articles/create', article_controller.createArticle)




module.exports = router;