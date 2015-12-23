'use strict';

// Modules
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD = false;
var TEST = false;
var env = 'dev'

process.argv.forEach(function(arg) {
  if (arg === '--test') { TEST = true; }
  if (arg === '--build') { BUILD = true; }
  if (arg === '--qa') { env = 'qa'; }
  if (arg === '--prod') { env = 'prod'; }
});

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

// ISPARTA LOADER
// Reference: https://github.com/ColCh/isparta-instrumenter-loader
// Instrument JS files with Isparta for subsequent code coverage reporting
// Skips node_modules and files that end with .test.js
if (TEST) {
  config.module.preLoaders.push({
    test: /\.js$/,
    exclude: [
      /node_modules/,
      /\.test\.js$/
    ],
    loader: 'isparta-instrumenter'
  })
}

/**
 * Plugins
 * Reference: http://webpack.github.io/docs/configuration.html#plugins
 * List: http://webpack.github.io/docs/list-of-plugins.html
 */
config.plugins = [];

var globals = {
  __ENV__: env
};

if (env == 'dev') {
  Object.assign(globals, {
    __API_URL__ : 'https://api-work.topcoder-dev.com',
    __AUTH0_CLIENT_ID__ : 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
    __AUTH0_DOMAIN__ : 'topcoder-dev.auth0.com',
    __NEWRELIC_APPLICATION_ID__ : '7374849',
    __NEWRELIC_LICENSE_KEY__ : '496af5ee90',
  });
}

if (env == 'qa') {
  Object.assign(globals, {
    __API_URL__: 'https://api-work.topcoder-qa.com',
    __AUTH0_CLIENT_ID__: 'EVOgWZlCtIFlbehkq02treuRRoJk12UR',
    __AUTH0_DOMAIN__: 'topcoder-qa.auth0.com',
  });
}

if (env == 'prod') {
  Object.assign(globals, {
    __API_URL__: 'https://api-work.topcoder.com',
    __AUTH0_CLIENT_ID__: 'abc',
    __AUTH0_DOMAIN__: 'topcoder.auth0.com',
  });
}

var envVars = [
  'AUTH0_TOKEN_NAME',
  'AUTH0_CLIENT_ID',
  'AUTH0_DOMAIN',
  'NEWRELIC_APPLICATION_ID',
  'NEWRELIC_LICENSE_KEY',
];

envVars.forEach(function(key) {
  if (process.env[key]) {
    globals['__' + key + '__'] = process.env[key]
  }
})

for (var key in globals) {
  globals[key] = '"' + globals[key] + '"';
}

config.plugins.push(new webpack.DefinePlugin(globals))

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
  contentBase: './public',
  stats: {
    modules: false,
    cached: false,
    colors: true,
    chunk: false
  },
  historyApiFallback: true
};

module.exports = config;