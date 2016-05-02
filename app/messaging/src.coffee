require './scripts/messaging.module'

requireContextFiles = (files) ->
  paths = files.keys()

  for path in paths
    files path

styles = require.context './styles/', true, /^(.*\.(scss$))[^.]*$/igm

requireContextFiles styles

require './scripts/messaging.directive'
require './scripts/messaging.controller'

