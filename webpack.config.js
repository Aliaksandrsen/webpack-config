const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env = {}) => {
  const { mode = 'development' } = env; //по умолчанию чтобы равно development

  const isProd = env.mode === 'production';
  const isDev = env.mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ]
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'New title',
        buildtime: new Date().toString(),
        template: 'public/index.html'
      })
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css'
        })
      )
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',

    // название файла в production mode
    output: {
      filename: isProd ? 'main-[hash:8].js' : underfined
    },

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
          use: getStyleLoaders(), // выбор css loader взавис от mode
        },
        {
          test: /\.(s[ca]ss)/,
          //? ============================ убираем внизу ф-я
          // use: [
          //   MiniCssExtractPlugin.loader,// добавление css на страницу
          //   'css-loader',
          //   'sass-loader', // лоадкры работают с конца
          // ],
          //? ============================
          use: [...getStyleLoaders(), 'sass-loader']
        },
      ]
    },
    //? ============================ убираем внизу ф-я
    // plugins: [
    //   new HtmlWebpackPlugin({
    //     title: 'New title',
    //     buildtime: new Date().toString(),
    //     template: 'public/index.html'
    //   }),
    //   new MiniCssExtractPlugin({
    //     filename: 'main-[hash:8].css'
    //   })
    // ],
    //? ============================
    plugins: getPlugins(),
    devServer: {
      open: true,
    },
  }
};
