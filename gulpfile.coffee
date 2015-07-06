configs =
  coffeeFiles     : 'src/client/app/**/*.coffee'
  jadeFiles       : 'src/client/app/**/*.jade'
  scssFiles       : 'src/client/app/**/*.scss'
  scssIncludePaths: require('node-neat').includePaths
  tempFolder      : '.tmp'
  appFolder       : 'src/client/app'
  distFolder      : 'build'
  buildFiles      : buildFiles
  envFile         : __dirname + '/.env'

# TODO: upgrade api schemas in order to use default configs instead of below
configs.fixture =
  destPath: configs.tempFolder

configs.fixture.files = [
  'bower_components/appirio-tech-api-schemas/v3.json'
  'bower_components/appirio-tech-api-schemas/v2.json'
  'bower_components/appirio-tech-api-schemas/v3-messages.json'
  'bower_components/appirio-tech-api-schemas/v3-threads.json'
  'bower_components/appirio-tech-api-schemas/v3-users.json'
]

# TODO:  use default settings
configs.ngConstants =
  destPath: '.tmp'

configs.templateCache =
  files   : ['src/client/app/**/*.html', '.tmp/**/*.html', '!.tmp/index.html']
  module  : 'app.core'
  destPath: '.tmp'
  # root  : '/views'

configs.cleanFiles = [
  '.tmp'
  'build'
]

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
    __dirname + '/bower_components/auto-config-fake-server/dist/auto-config-fake-server.js'
    __dirname + '/bower_components/appirio-tech-ng-auth/dist/main.js'
    __dirname + '/src/client/test-helpers/*.js'
    __dirname + '/src/client/app/**/*.stubs.js'
    __dirname + '/src/client/mock-api/*.coffee'
    __dirname + '/src/client/test-helpers/*.coffee'
    __dirname + '/src/client/app/**/*.module.{js,coffee}'
    __dirname + '/src/client/app/**/*.{js,coffee}'
    __dirname + '/.tmp/constants.js'
    __dirname + '/.tmp/templates.js'
  ])

buildFiles =
  concat:
    'main.js': [
      '.tmp/scripts/ng-auth.module.js',
      '.tmp/scripts/authorizations-api.service.js',
      '.tmp/scripts/token.service.js',
      '.tmp/scripts/auth.service.js',
      '.tmp/scripts/user-v3-api.service.js',
      '.tmp/scripts/user-v3.service.js'
    ]


### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs