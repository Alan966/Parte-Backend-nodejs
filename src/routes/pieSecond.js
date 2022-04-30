const express = require('express')
const router = express.Router() 

const { list, create, remove, PieTwoById} = require('../controllers/PieSecondControllers'); 


router.get('/all', list)

router.post(`/create`,  create)

router.delete('/: PieTwoById', remove)

router.param(' PieTwoById',  PieTwoById)

module.exports = router;