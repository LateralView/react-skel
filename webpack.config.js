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
  const isSecure = process.env.IS_HTTPS ? 'https' : 'http'
  let plugins = [
    extractCSS,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      'process.env.API_URL': JSON.stringify(`${isSecure}://${process.env.API_URL || 'localhost'}:${process.env.API_PORT || 8085}/api`)
    })
  ]

  if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin())
    plugins.push(new webpack.optimize.DedupePlugin())
  }

  else {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new webpack.NamedModulesPlugin())
  }
  
  return plugins
}

module.exports = {
  // Don't directly expose sourcemaps on production
  devtool: isProduction ? 'hidden-source-map' : 'inline-source-map',
  // webpack-dev-server configurations
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    hot: true, 
    inline: true, 
    historyApiFallback: true 
  },
  // Used to run unit testing because the packages has some issues
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
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
        test: /sinon\.js$/,
        use: [{ 
          loader: 'imports-loader',
          options: {define: '>false', require: '>false'}
        }]
      },
      {
        test: /index.html/,
        use: [{
          loader: 'file-loader', 
          options: {
            name: '[name].[ext]'
          }
        }]
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
        test : /\.jsx?/,
        include : APP_DIR,
        use: [
          { loader: 'react-hot-loader' },
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
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
      }
    ]
  },
  plugins: getPlugins(),
  resolve: {
    // Alias ~ as the base dir, so you don't need to do the infamous '../../../' on definitions
    // The sinon file is replaced with the real source file, that is why we use the import loader
    alias: {
      '~': path.resolve(APP_DIR),
      sinon: 'sinon/pkg/sinon.js'
    },
    // Allow us to use peerDependencies on library packages
    modules: [ path.join(__dirname, 'node_modules') ]
  }
}