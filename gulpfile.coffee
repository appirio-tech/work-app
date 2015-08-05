configs =
  coffeeFiles     : 'src/client/app/**/*.coffee'
  jadeFiles       : 'src/client/app/**/*.jade'
  scssFiles       : 'src/client/app/**/*.scss'
  scssIncludePaths: require('appirio-work-styles').includePaths
  tempFolder      : '.tmp'
  appFolder       : 'src/client/app'
  distFolder      : 'dist'
  envFile         : __dirname + '/.env'
  taskPath        : __dirname + '/node_modules/appirio-gulp-tasks'

# TODO: upgrade api schemas in order to use default configs instead of below
configs.fixture =
  destPath: configs.tempFolder

configs.fixture.files = [
  'bower_components/appirio-tech-api-schemas/swagger/v3-events.json'
  'bower_components/appirio-tech-api-schemas/swagger/v2.json'
  'bower_components/appirio-tech-api-schemas/swagger/v3-messages.json'
  'bower_components/appirio-tech-api-schemas/swagger/v3-threads.json'
  'bower_components/appirio-tech-api-schemas/swagger/v3-users.json'
  'bower_components/appirio-tech-api-schemas/swagger/v3-submissions.json'
]

# TODO: CORS for https://topcoder-dev.auth0.com/oauth/ro is hard coded to allow http://localhost:3000/
configs.serve =
  port: 3000

configs.useref =
  searchPath: ['.tmp', 'src/client/app/', '.']

configs.copyFiles =
  files:
    'dist': 'src/client/app/**/*.{gif,png,jpg,jpeg,svg}'
  base: 'src/client/app/'

# TODO:  use default settings
configs.ngConstants =
  destPath: '.tmp'

configs.templateCache =
  files   : ['src/client/app/**/*.html', '.tmp/**/*.html', '!.tmp/index.html']
  module  : 'app.core'
  destPath: '.tmp'
  # root  : '/views'

#TODO: remove using wiredep
wiredep    = require 'wiredep'
bowerFiles = wiredep({devDependencies: true})['js']
karmaFiles = bowerFiles

configs.karma =
  configFile  : __dirname + '/node_modules/appirio-gulp-tasks/tasks/karma.conf.coffee'
  basePath    : __dirname
  coffeeFiles : [
    __dirname + '/src/client/**/*.coffee'
  ]
  files: karmaFiles.concat([
    __dirname + '/.tmp/json-fixtures.js'
    __dirname + '/src/client/test-helpers/*.js'
    __dirname + '/src/client/app/**/*.stubs.js'
    __dirname + '/src/client/mock-api/*.coffee'
    __dirname + '/src/client/test-helpers/*.coffee'
    __dirname + '/src/client/app/**/*.module.{js,coffee}'
    __dirname + '/bower_components/auto-config-fake-server/dist/auto-config-fake-server.js'
    __dirname + '/bower_components/appirio-tech-ng-auth/dist/main.js'
    __dirname + '/bower_components/appirio-tech-copilot/build/js/copilot-app.js'
    __dirname + '/src/client/app/**/*.{js,coffee}'
    __dirname + '/.tmp/constants.js'
    __dirname + '/.tmp/templates.js'
  ])

env = process.env.TRAVIS_BRANCH || 'dev'

if env == 'dev'

  configs.cdnify =
    url: '//work.topcoder-dev.com'

  configs.ngConstants.constants =
    apiUrl          : 'https://api.topcoder-dev.com/v3/'
    API_URL         : 'https://api.topcoder-dev.com/v3'
    API_URL_V2      : 'https://api.topcoder-dev.com/v2'
    AUTH0_DOMAIN    : 'topcoder-dev.auth0.com'
    AUTH0_CLIENT_ID : 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT'

if env == 'qa'

  configs.cdnify =
    url: '//work.topcoder-qa.com'

  configs.ngConstants.constants =
    apiUrl          : 'https://api.topcoder-qa.com/v3/'
    API_URL         : 'https://api.topcoder-qa.com/v3'
    API_URL_V2      : 'https://api.topcoder-qa.com/v2'
    AUTH0_DOMAIN    : 'topcoder-qa.auth0.com'
    AUTH0_CLIENT_ID : 'EVOgWZlCtIFlbehkq02treuRRoJk12UR'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs

