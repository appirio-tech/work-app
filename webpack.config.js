require('./node_modules/coffee-script/register')

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html',
  favicon: './app/images/favicon.ico'
})

module.exports = config