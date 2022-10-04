// 初始化基本服务器
const express = require('express')
const port = 3001
// 导入cors 中间件
const cors = require('cors')

const app = express()
// 注册全局中间件
app.use(cors())
// 解析applacation /x-www-form urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 路由之前封装res.cc函数
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

var expressJWT = require('express-jwt');
const config = require('./config')

app.use(
    expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api/] })
)


const userRouter = require('./router/user')
app.use('/api', userRouter)

const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

const artCateRouter = require('./router/artcate')
app.use('/my/artcate',artCateRouter)

const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
    res.cc(err)
})

app.listen(port, () => console.log(`服务器运行在http://127.0.0.1:${port}`))