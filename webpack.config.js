require('./node_modules/coffee-script/register')

if (process.env.TRAVIS_BRANCH === 'master') process.env.ENV = 'PROD'
if (process.env.TRAVIS_BRANCH === 'dev') process.env.ENV = 'DEV'
if (process.env.TRAVIS_BRANCH === 'qa') process.env.ENV = 'QA'

const domain = 'https://accounts.topcoder-dev.com'

process.env.CONNECTOR_URL = `${domain}/connector.html`
process.env.ACCOUNTS_URL = `${domain}/connect`

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html',
  favicon: './app/images/favicon.ico'
})

module.exports = config