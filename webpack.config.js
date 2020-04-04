const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",


  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // images
      {
        test: /\.(png|jpg|jpeg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name]-[sha1:hash:7].[ext]'
            }
          }
        ]
      },
      // fonts
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(css)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(s[ca]ss)/,
        use: [
          MiniCssExtractPlugin.loader,// добавление css на страницу
          'css-loader',
          'sass-loader', // лоадкры работают с конца
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'New title',
      buildtime: new Date().toString(),
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({ 
      filename: 'main-[hash:8].css'
    })
  ],
  devServer: {
    open: true,
    
  },
};
