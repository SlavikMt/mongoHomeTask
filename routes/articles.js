const router = require('express').Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.get('/', articleController.getList)
router.delete('/:id', articleController.deleteArticle);

module.exports = router;