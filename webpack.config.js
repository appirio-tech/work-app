require('./node_modules/coffee-script/register')

if (process.env.TRAVIS_BRANCH === 'master') {
  process.env.ENV = 'PROD'
}	else if (process.env.TRAVIS_BRANCH === 'qa') {
  process.env.ENV = 'QA'
}	else {
  process.env.ENV = 'DEV'
}

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html',
  favicon: './app/images/favicon.ico'
})

module.exports = config