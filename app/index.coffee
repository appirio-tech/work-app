require 'babel-polyfill'

scripts    = document.getElementsByTagName 'script'
src        = scripts[scripts.length - 1].getAttribute 'src'
publicPath = src.substr 0, src.lastIndexOf('/' + 1)

__webpack_public_path__ = publicPath

require 'angular'
require 'angular-ui-router'
require 'angular-resource'

require './app.module'
require './app-config'
require './app-run'
require 'appirio-tech-ng-ui-components'

require './auth/auth.module.js'
require './api-services/api-services.module.js'
require './file-upload/src.coffee'
require './layout/src.coffee'
require './messaging/src.coffee'
require './optimist/src.coffee'
require './project-creation/src.coffee'
require './projects/src.coffee'
require './status-report/src.coffee'
require './submissions/src.coffee'
require './timeline/src.coffee'

constants = require './constants.js'

module = angular.module 'app.constants', []

for key, value of constants
  module.constant key, value

requireContextFiles = (files) ->
  paths = files.keys()

  for path in paths
    files path

requireContextFiles require.context './', true, /^(.*\.(scss$))[^.]*$/igm
