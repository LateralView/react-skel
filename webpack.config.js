const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = process.argv.indexOf('-p') !== -1
const BUILD_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src')

const extractCSS = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true,
  disable: !isProduction
})

/**
 * Conditionally get plugins based on the environment
 */
const getPlugins = () => {
  let plugins = [
    extractCSS,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        isProduction ? 'production' : 'development'
      ),
      'process.env.API_URL': JSON.stringify(
        process.env.API_URL || 'http://localhost:8085/api'
      )
    })
  ]

  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new webpack.NamedModulesPlugin())
  }

  return plugins
}

module.exports = {
  // Don't directly expose sourcemaps on production
  devtool: isProduction ? false : 'inline-source-map',
  // webpack-dev-server configurations
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  // Entry of the project, use babel polyfill.
  // Can be configured to split into diferent files.
  entry: {
    bundle: [
      'babel-polyfill',
      'whatwg-fetch',
      APP_DIR + '/index.js',
      APP_DIR + '/index.html'
    ]
  },
  // Output, directly into dist/
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    // Set up loaders to process your files
    rules: [
      {
        test: /index\.(html|prod\.html)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'index.html'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: { quality: 65 }
            }
          }
        ]
      },
      {
        test: /\.jsx?/,
        include: APP_DIR,
        use: [
          { loader: 'react-hot-loader/webpack' },
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                camelCase: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: 'inline' }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ],
          fallback: { loader: 'style-loader', options: { sourceMap: true } }
        })
      },
      {
        test: /\.less$/,
        use: extractCSS.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: 'inline' }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true }
            }
          ],
          fallback: { loader: 'style-loader', options: { sourceMap: true } }
        })
      },
      {
        test: /\.css/,
        include: APP_DIR,
        use: [
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: 'inline' }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: getPlugins(),
  resolve: {
    // Allow us to use peerDependencies on library packages
    extensions: ['.js', '.jsx'],
    alias: {
      '../../theme.config$': path.join(__dirname, 'src/semanticui/theme.config')
    },
    modules: [path.join(__dirname, 'node_modules')]
  }
}
