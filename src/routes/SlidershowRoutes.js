const express = require('express')
const router = express.Router(); 

const { list, read, create, remove, slidershowId, photo } = require('../controllers/SliderShowControllers')

router.get('/slidershow',  list)
router.post('/create', create)
router.get('/photo/:slidershowId', photo)
router.get('/:slidershowId', read)
router.delete('/:slidershowId', remove)
router.param("slidershowId", slidershowId)

module.exports = router; 