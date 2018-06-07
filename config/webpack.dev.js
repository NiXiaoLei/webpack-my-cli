const path = require('path')
import webpack  from 'webpack'

// 引入 前端html热更新
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口文件
    entry:{
        main:["./src/main.js"]
    },
    mode:"development",
    // 出口文件
    output:{
        // 文件名
        filename:"[name]-bundle.js",
        // 输出目录
        path: path.resolve(__dirname,"../dist"),
        publicPath:""
    },
    // 配置本地服务器
    devServer:{
        // 设置为启动时默认进入dist
        contentBase:"dist",
        // 是否开热更新
        hot:true,
        // 让页面输出报错信息
        overlay:true
    },
    // 读取文件规则
    module:{
        // 查找规则  rules 在webpack4之前的版本是叫loaders
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                         // 负责把css写入html
                         // 这里的顺序千万不能有问题
                         loader:"style-loader"
                    },
                    {
                        // 负责把css样式放到mian-bundle.js
                        loader:"css-loader"
                    }
                ]
            },
            {
                test:/\.html$/,
                use:[
                    // {
                    //     // 给文件取名
                    //     loader:"file-loader",
                    //     options:{
                    //         name:"[name].html"
                    //     }
                    // },
                    // {
                    // // 将 index和 bundle.js  进行一个区分，不会融入到一体
                    //     loader:"extract-loader"
                    // },
                    {
                        // 可以理解为此处所有Loader 的执行者
                        loader:"html-loader",
                        options:{
                            // 查找属性
                            attrs:["img:src"]
                        }
                    }
                ]
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,
                use:[
                        {
                            loader:"file-loader",
                            options:{
                                // 增加一个8位的哈希值
                                name:"images/[name]-[hash:8].[ext]"
                            }
                        }
                ]
               
            }
           
        ]
    },
    // 开启热更新还需要一个插件
    plugins:[
        new webpack.HotModuleReplacementPlugin()
        ,new HTMLWebpackPlugin({
            // 配置要找到的html 文件
            template:"./src/index.html"
        })
    ]



}