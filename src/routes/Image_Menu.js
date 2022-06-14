const express = require('express')
const router = express.Router() 
const {list, read, create, remove, ImageMenuById, photo } = require('../controllers/ImageGames_Controllers')

router.get('/imageAll', list)

router.post('/create', create)

router.get('/photo/:ImageRelojById', photo)

router.get('/:ImageRelojById', read)

router.delete('/:ImageRelojById',remove)

router.param("ImageRelojById", ImageMenuById)

module.exports = router;

