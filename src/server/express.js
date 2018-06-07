// 启动一个服务器
import  express from 'express';
import  path  from 'path';

// 创建服务器

const server = express()



// 配置启动路径
const staticMiddleware = express.static("dist")

// 配置监听代码
const webpack = require("webpack")
// -引入 webpack 配置文件
const config = require('../../config/webpack.dev')

// 将配置信息传入 webpack 方法
const compiler = webpack(config)

require("webpack-mild-compile")(compiler)

// 引入下载好的webpack-dev-middleware 代码监听工具，
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler,config.devServer)

// 配置热更新
// 需要传入compiler
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler)





// 挂载监听器
server.use(webpackDevMiddleware)

// 热更新必须挂载在 devMiddleware之下   staticMiddleware之上
server.use(webpackHotMiddleware)


server.use(staticMiddleware)






server.listen(8080,()=>{
    console.log('Server is running on localhost:8080')
})
