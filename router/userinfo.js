const express = require('express')

const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')
// 获取用户信息
router.get('/userinfo',userinfo_handler.getUserInfo)

// 更新用户信息
router.post('/userinfo',userinfo_handler.updateUserInfo)

// 更新用户的密码
router.post('/updatepwd',userinfo_handler.updatePassword)

// 更新用户头像
router.post('/update/avator',userinfo_handler.updateAvatar)

module.exports = router