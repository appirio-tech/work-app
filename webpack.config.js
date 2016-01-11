require('./node_modules/coffee-script/register');

if (['master', 'dev', 'qa'].indexOf(process.env.TRAVIS_BRANCH) > -1) {
  process.env.ENV = process.env.TRAVIS_BRANCH;
}

config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html'
});

module.exports = config;