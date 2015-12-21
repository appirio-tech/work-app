env     = require '../env'
angular = require 'angular'
app     = angular.module 'app.constants', []

constants =
  AUTH0_TOKEN_NAME: 'userJWTToken'
  AUTH0_REFRESH_TOKEN_NAME: 'userRefreshJWTToken'

if env == 'local' || env == 'dev'
  constants.API_URL = 'https://api-work.topcoder-dev.com'
  constants.AUTH0_CLIENT_ID = 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT'
  constants.AUTH0_DOMAIN = 'topcoder-dev.auth0.com'
  constants.NEWRELIC_APPLICATION_ID = '7374849'
  constants.NEWRELIC_LICENSE_KEY = '496af5ee90'

if env == 'qa'
  constants.API_URL = 'https://api-work.topcoder-qa.com'
  constants.AUTH0_CLIENT_ID = 'EVOgWZlCtIFlbehkq02treuRRoJk12UR'
  constants.AUTH0_DOMAIN = 'topcoder-qa.auth0.com'

if env == 'prod'
  constants.API_URL = 'https://api-work.topcoder.com'
  constants.AUTH0_CLIENT_ID = 'abc'
  constants.AUTH0_DOMAIN = 'topcoder.auth0.com'

for key, value of constants
  app.constant key, value

module.exports = constants