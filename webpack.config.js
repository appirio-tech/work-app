require('./node_modules/coffee-script/register')

if (process.env.TRAVIS_BRANCH === 'master') {
  process.env.ENV = 'PROD'
  process.env.DOMAIN = 'topcoder.com'
}
else if (process.env.TRAVIS_BRANCH === 'qa') {
  process.env.ENV = 'QA'
  process.env.DOMAIN = 'topcoder-qa.com'
}
else {
  process.env.ENV = 'DEV'
  process.env.DOMAIN = 'topcoder-dev.com'
}

process.env.CONNECTOR_URL = `https://accounts.${process.env.DOMAIN}/connector.html`
process.env.ACCOUNTS_URL = `https://accounts.${process.env.DOMAIN}/connect`

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html',
  favicon: './app/images/favicon.ico'
})

module.exports = config