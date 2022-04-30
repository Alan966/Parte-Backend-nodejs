const express = require('express')
const router = express.Router()

const { list, create,  remove, pieId} = require('../controllers/PieControllers')

router.get('/all', list)

router.post('/create', create)

router.delete('/:pieId', remove)

router.param('pieId', pieId)

module.exports = router

