require './scripts/submissions.module'

requireContextFiles = (files) ->
  paths = files.keys()

  for path in paths
    files path

styles      = require.context './styles/', true, /^(.*\.(scss$))[^.]*$/igm
directives  = require.context './scripts/directives/', true, /^(.*\.(coffee$))[^.]*$/igm
controllers = require.context './scripts/controllers/', true, /^(.*\.(coffee$))[^.]*$/igm
services    = require.context './scripts/services/', true, /^(.*\.(coffee$))[^.]*$/igm

requireContextFiles directives
requireContextFiles controllers
requireContextFiles services
requireContextFiles styles

