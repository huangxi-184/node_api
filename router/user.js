const express = require('express')

const router = express.Router()

const user_handler = require('../router_handler/user')
// 注册

router.post('/reguser', user_handler.regUser)

// login
router.post('/login', user_handler.login)

module.exports = router