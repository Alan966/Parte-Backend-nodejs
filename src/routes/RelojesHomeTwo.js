const express = require('express'); 
const router = express.Router(); 
const { list, read, create, remove, relojesHomeTwoId, photo } = require('../controllers/reloj_Timex_Two_Controllers');

router.get('/all', list)
router.post('/create', create)

router.get('/photo/:relojesHomeTwoId', photo)

router.get('/:relojesHomeTwoId', read)

router.delete('/:relojesHomeTwoId', remove)

router.param("relojesHomeTwoId", relojesHomeTwoId)

module.exports = router;