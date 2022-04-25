// Store current task (dev or build)
const currentTask = process.env.npm_lifecycle_event
const path = require('path')
// Clean Webpack plugin to clear dist folder when new JS is generated
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// css minimizer extracts css from js file 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css minifier
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// Add js to the html since name of outputted file will change
const HtmlWebpackPlugin = require('html-webpack-plugin')
// fs-extra manages multiple html files in the site
const fse = require('fs-extra')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-mixins'),
]

// Self created plugin to copy images to dist folder
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function() {
      fse.copySync('./app/assets/images', './docs/assets/images')
    })
  }
}

// Define rules for css configuration
let cssConfig = {
  test: /\.css$/i,
  use: ['css-loader?url=false', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
}

//Setup html webpack plugin for each html file that we have
let pages = fse.readdirSync('./app').filter(function(file) {
  // Return array with all the files that have the html extension
  return file.endsWith('.html')
}).map(function(page) {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./app/${page}`
  })
})


// Common tasks to dev and build
let config = {
  entry: './app/assets/scripts/App.js',
  plugins: pages,
  module: {
    rules: [
        cssConfig
    ]
  }
}

// Tasks only for dev
if (currentTask == 'dev') {
  // Add to the beginning of the array style-loader from the cssConfig task when running dev
  cssConfig.use.unshift('style-loader')
  // Determine where the output goes
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  }
  config.devServer = {
    before: function(app, server) {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host: '0.0.0.0'
  }
  config.mode = 'development'
}

// Tasks only for build
if (currentTask == 'build') {
  // Use babel module to add compatibility for older browsers to js files except node_modules
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })
  // Add to the beginning of the array css extracter and minifier from the cssConfig task when running dev
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  config.output = {
    // Generate name with chunkhash to identify files that have changed
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs')
  }
  config.mode = 'production'
  // Create separate vendor code (f. ex. lodash, etc.) file so no need to download if something changes with our JS
  config.optimization = {
    splitChunks: {chunks: 'all'},
    //css minimizer optimization settings
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
  // Add plugins to the process
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
    // Plugin created by us, can be found above
    new RunAfterCompile()  
  )}


module.exports=config