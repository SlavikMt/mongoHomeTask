const router = require('express').Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);
router.get('/:id', userController.detailsUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/:id/articles', userController.getArticles);

module.exports = router;