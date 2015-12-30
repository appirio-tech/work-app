require('./node_modules/coffee-script/register');

config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html'
});

module.exports = config;