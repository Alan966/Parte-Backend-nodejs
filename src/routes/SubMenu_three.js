const express = require('express'); 
const router = express.Router(); 
const controlles = require('../controllers/SubMenu_three');

router.get('/all', controlles.list);

router.post('/create', controlles.create);

router.delete('/:SubmenuthreeById', controlles.remove);

router.param('SubmenuthreeById', controlles.SubmenuthreeById)

module.exports = router;