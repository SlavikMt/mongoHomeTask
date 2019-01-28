const express = require('express');
const router = express.Router();


const controller = require('../controllers/user.controller');

router.post('/create', controller.create);
router.get('/:id', controller.details);
router.put('/:id/update', controller.update)
router.delete('/:id/delete', controller.delete);



module.exports = router;