//导入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const optimizeCss = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require('path')

const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  watch:false,
  // 指定文件的入口
  entry: "./lib/index.js",
  //出口
  output: {
    // 定义文件名
    filename: 'main.js',
    // 定义文件夹  // __dirname获取当前目录
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    // 实例化vue插件
    new HtmlWebpackPlugin({
      //指定模板
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    })
  ],
  devServer: {
    open: true, //打开浏览器
    host: "localhost", //本地域名
    port: 8080, //端口号
    hot: true, //热加载
  },
  // 模块
  module:{
    // 规则
    rules:[
      {
        //测试.css文件结尾
        test: /\.css$/i,
        // 使用两个loader加载器
        use:[
          // "style-loader", // 将css打包到js中
          // 2. 将css打包到独立文件中
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      }
    ]
  },
  optimization: {
    // 压缩
    minimizer: [new optimizeCss(), new TerserWebpackPlugin()],
    // 代码分割
    splitChunks: {
      chunks: "all",
    }
  }
};
// module.export node中导出模块的意思
