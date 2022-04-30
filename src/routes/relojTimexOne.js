const express = require('express');
const router = express.Router();
const {  list, read, create, remove, relojTimexOneId, photo} = require('../controllers/relojTimexOneControllers');

router.get('/all', list);

router.post('/create', create);

router.get('/photo/:relojTimexOneId', photo)

router.get('/:relojTimexOneId', read)

router.delete('/:relojTimexOneId', remove)

router.param("relojTimexOneId", relojTimexOneId)
module.exports = router;