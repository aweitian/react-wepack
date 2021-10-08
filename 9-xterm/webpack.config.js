const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')


module.exports = {

  mode: 'development',
  devServer: {
    historyApiFallback: true,
    // contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 6262,
  },

  entry: {
    main: path.resolve(__dirname, './src/client/index.js'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },


  


  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/client/template.html'), // template file  会在HTML文件中自动加入上面的main.bundle.js
      filename: './index.html', // output file
    }),

    new CleanWebpackPlugin(),


    new webpack.HotModuleReplacementPlugin(),
  ],




  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // Jsx
      {
        test:/\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }],
      },

      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },


      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },

      //less
      {
        test: /\.less$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader' }
        ]
      },
    ],
  },

}