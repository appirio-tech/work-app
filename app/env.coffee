scripts    = document.getElementsByTagName 'script'
src        = scripts[scripts.length - 1].getAttribute 'src'
publicPath = src.substr 0, src.lastIndexOf('/') + 1

__webpack_public_path__ = publicPath

env = 'local'

if publicPath.includes 'topcoder'
  env = 'prod'

if publicPath.includes 'topcoder-dev'
  env = 'dev'

if publicPath.includes 'topcoder-qa'
  env = 'qa'

module.exports = env