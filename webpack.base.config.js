const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');


const path = require('path')

module.exports = {
  //默认是production，打包的文件默认被压缩。开发时可以设置为development，不被压缩
  // mode: 'production',
  //打包项目的入口文件
  entry: {
    main: './src/main.js',
  },
  //打包项目的输出文件
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    //自定义打包输出文件名
    filename: 'js/[name].[hash].js',
    //输出文件的绝对路径
    path: path.resolve(__dirname, 'dist'),
    libraryExport: "default",
    library: "InitDB",
    libraryTarget: "umd"
  },
  plugins: [
    new CleanWebpackPlugin(), // 在打包之前，可以删除dist文件夹下的所有内容
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html' //在打包之后，以.html为模板，把打包生成的js自动引入到这个html文件中
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.png|jpg|gif|bmp$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './images/[name].[ext]',
              // outputPath: 'images/',
              limit: 8192 //小于8192b,就可以转化成base64格式。大于就会打包成文件格式
            }
          }
        ]
      }
    ]
  }

}