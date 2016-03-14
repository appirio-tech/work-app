scripts    = document.getElementsByTagName 'script'
src        = scripts[scripts.length - 1].getAttribute 'src'
publicPath = src.substr 0, src.lastIndexOf('/' + 1)

__webpack_public_path__ = publicPath

require 'angular'
require 'angular-ui-router'

require './app.module'
require './app-config'
require './app-run'

require 'appirio-tech-ng-api-services'
require 'appirio-tech-ng-auth'
require 'appirio-tech-ng-login-reg'
require 'appirio-tech-ng-messaging'
require 'appirio-tech-ng-projects'
require 'appirio-tech-ng-status-report'
require 'appirio-tech-ng-submissions'
require 'appirio-tech-ng-submit-work'
require 'appirio-tech-ng-timeline'
require 'appirio-tech-ng-work-layout'

requireContextFiles = (files) ->
  paths = files.keys()

  for path in paths
    files path

requireContextFiles require.context './', true, /^(.*\.(scss$))[^.]*$/igm
requireContextFiles require.context './', true, /^(?:(?!\.spec\.js$).)*\.js$/igm
requireContextFiles require.context './', true, /^(.*\.(jsx$))[^.]*$/igm
requireContextFiles require.context './', true, /^(.*\.(coffee$))[^.]*$/igm