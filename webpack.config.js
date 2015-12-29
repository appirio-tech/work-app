'use strict';

// Modules
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD = false;
var TEST = false;
var ENV = 'dev'

process.argv.forEach(function(arg) {
  if (arg === '--test') { TEST = true; }
  if (arg === '--build') { BUILD = true; }
  if (arg === '--qa') { ENV = 'qa'; }
  if (arg === '--prod') { ENV = 'prod'; }
});

if (ENV == 'dev') {
  Object.assign(process.env, {
    API_URL : 'https://api-work.topcoder-dev.com',
    AUTH0_CLIENT_ID : 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
    AUTH0_DOMAIN : 'topcoder-dev.auth0.com',
    NEWRELIC_APPLICATION_ID : '7374849',
    NEWRELIC_LICENSE_KEY : '496af5ee90',
  });
}

if (ENV == 'qa') {
  Object.assign(process.env, {
    API_URL: 'https://api-work.topcoder-qa.com',
    AUTH0_CLIENT_ID: 'EVOgWZlCtIFlbehkq02treuRRoJk12UR',
    AUTH0_DOMAIN: 'topcoder-qa.auth0.com',
  });
}

if (ENV == 'prod') {
  Object.assign(process.env, {
    API_URL: 'https://api-work.topcoder.com',
    AUTH0_DOMAIN: 'topcoder.auth0.com',
  });
}

/**
 * Config
 * Reference: http://webpack.github.io/docs/configuration.html
 * This is the object where all configuration gets set
 */
var config = {};

/**
 * Entry
 * Reference: http://webpack.github.io/docs/configuration.html#entry
 * Should be an empty object if it's generating a test build
 * Karma will set this when it's a test build
 */
if (TEST) {
  config.entry = {}
} else {
  config.entry = {
    app: './app/index.js'
  }
}

/**
 * Output
 * Reference: http://webpack.github.io/docs/configuration.html#output
 * Should be an empty object if it's generating a test build
 * Karma will handle setting it up for you when it's a test build
 */
if (TEST) {
  config.output = {}
} else {
  config.output = {
    // Absolute output directory
    path: __dirname + '/dist',

    // Filename for entry points
    // Only adds hash in build mode
    filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
  }
}

/**
 * Devtool
 * Reference: http://webpack.github.io/docs/configuration.html#devtool
 * Type of sourcemap to use per build type
 */
if (TEST) {
  config.devtool = 'inline-source-map';
} else if (BUILD) {
  config.devtool = 'source-map';
} else {
  config.devtool = 'eval';
}

/**
 * Loaders
 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
 * List: http://webpack.github.io/docs/list-of-loaders.html
 * This handles most of the magic responsible for converting modules
 */

// Initialize module
config.module = {
  preLoaders: [],
  loaders: [
    {
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw'
    },
    { test: /\.coffee$/, loader: "coffee" },
    { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee?literate" },
    { test: /\.jade$/, loader: "jade" },
    { test: /\.css$/, loader: "style!css?sourceMap" },
    { test: /\.scss$/, loader: "style!css!sass" },
    { test: /\.json$/, loader: "json" }
  ],
  postLoaders: [
    {
      test: /\.js|\.coffee$/,
      loader: 'transform?envify'
    },
  ]
}

config.sassLoader = {
  includePaths: [
    path.join(__dirname, '/node_modules/bourbon/app/assets/stylesheets'),
    path.join(__dirname, '/node_modules/bourbon-neat/app/assets/stylesheets'),
    path.join(__dirname, '/node_modules/appirio-work-styles/styles'),
    path.join(__dirname, '/node_modules/appirio-styles/styles')
  ]
}

config.resolve = {
  modulesDirectories: ['node_modules', 'bower_components'],
  extensions: ['', '.js', '.json', '.coffee', '.jade', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.svg']
}

/**
 * Plugins
 * Reference: http://webpack.github.io/docs/configuration.html#plugins
 * List: http://webpack.github.io/docs/list-of-plugins.html
 */
config.plugins = [];

// Skip rendering index.html in test mode
if (!TEST) {
  // Reference: https://github.com/ampedandwired/html-webpack-plugin
  // Render index.html
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: 'body'
    })
  )
}

// Add build specific plugins
if (BUILD) {
  config.plugins.push(
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    new webpack.optimize.DedupePlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin()
  )
}

/**
 * Dev server configuration
 * Reference: http://webpack.github.io/docs/configuration.html#devserver
 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
 */
config.devServer = {
  stats: {
    modules: false,
    cached: false,
    colors: true,
    chunk: false
  },
  historyApiFallback: true
};

module.exports = config;