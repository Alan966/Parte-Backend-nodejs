const express = require('express')
const router = express.Router()

const {list, read, create, remove, ImageRelojById, photo} = require("../controllers/Reloj_Total_Controllers")

router.get('/all', list)
router.get('/create', create)
router.get('/photo/:ImageRelojById', photo)
router.get('/:ImageRelojById', read)
router.delete('/:ImageRelojById', remove)
router.param("ImageRelojById", ImageRelojById)

module.exports = router;