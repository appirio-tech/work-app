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

require './auth/auth.module.js'
require './api-services/api-services.module.js'
require './layout/src.coffee'
require './login-reg/src.coffee'

require 'appirio-tech-ng-optimist'
require 'appirio-tech-ng-ui-components'
require 'appirio-tech-ng-work-constants'
require 'appirio-tech-ng-file-upload'
require 'appirio-tech-ng-messaging'
require 'appirio-tech-ng-projects'
require 'appirio-tech-ng-status-report'
require 'appirio-tech-ng-submissions'
require 'appirio-tech-ng-submit-work'
require 'appirio-tech-ng-timeline'

requireContextFiles = (files) ->
  paths = files.keys()

  for path in paths
    files path

requireContextFiles require.context './', true, /^(.*\.(scss$))[^.]*$/igm
requireContextFiles require.context './', true, /^(?:(?!\.spec\.js$).)*\.js$/igm
requireContextFiles require.context './', true, /^(.*\.(jsx$))[^.]*$/igm
requireContextFiles require.context './', true, /^(.*\.(coffee$))[^.]*$/igm
