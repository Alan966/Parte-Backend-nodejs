const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken');
const autenticacionControllers = require(`../controllers/autenticacionControlles`)

router.get('/admin', verifyToken.verifyToken, autenticacionControllers.getAdmin)
router.post('/login', autenticacionControllers.login)
router.post('/register', autenticacionControllers.register)

module.exports = router