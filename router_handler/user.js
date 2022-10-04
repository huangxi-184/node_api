const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        // return res.send({ status: 1, message: '用户名或者密码不合法!' })
        return res.cc('用户名或者密码不合法!')
    }
    // 定义SQL 语句
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, [userinfo.username], (err, results) => {
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他的用户名!' })
            return res.cc('用户名被占用，请更换其他的用户名!')
        }
        // TODO:用户名可用,对密码进行加密 bcryptjs
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败,请稍后再试' })
                return res.cc('注册用户失败,请稍后再试')
            }
            // res.send({status:0,message:'恭喜,注册成功'})
            res.cc('恭喜,注册成功', 0)
        })
    })

}
//login
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, [userinfo.username], (err, results) => {
        if (err) return res.cc(err)
        // 执行SQL 语句成功
        if (results.length !== 1) return res.cc('登录失败')
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        if (!compareResult) return res.cc('登录失败！')
        // 生成token JWT 对用户信息加密
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            sttatus:0,
            message:'登录成功！',
            token:'Bearer '+tokenStr
        })
    })
}