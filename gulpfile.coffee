configs =
  __dirname : __dirname

configs.templateCache = []

# TODO: CORS for https://topcoder-dev.auth0.com/oauth/ro is hard coded to allow http://localhost:3000/
configs.serve =
  port: 3000

configs.templateCache.push
  files   : [
    'app/**/*.html'
    '.tmp/**/*.html'
    '!.tmp/index.html'
    '!.tmp/css-files.html'
    '!.tmp/js-files.html'
  ]
  module  : 'app'

env = process.env.TRAVIS_BRANCH || 'dev'

configs.ngConstants = {}

if env == 'dev'
  configs.cdnify =
    url: '//work.topcoder-dev.com'

  configs.ngConstants.constants =
    API_URL         : 'https://api.topcoder-dev.com'
    AUTH0_DOMAIN    : 'topcoder-dev.auth0.com'
    AUTH0_CLIENT_ID : 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT'

if env == 'qa'
  configs.cdnify =
    url: '//work.topcoder-qa.com'

  configs.ngConstants.constants =
    API_URL         : 'https://api-work.topcoder-qa.com'
    AUTH0_DOMAIN    : 'topcoder-qa.auth0.com'
    AUTH0_CLIENT_ID : 'EVOgWZlCtIFlbehkq02treuRRoJk12UR'

configs.uglify =
  options:
    mangle  : false
    compress: false
    output  :
      beautify: true

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
