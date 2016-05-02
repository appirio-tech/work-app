require './scripts/timeline.module'

requireContextFiles = (files) ->
  paths = files.keys()

  for path in paths
    files path

styles      = require.context './styles/', true, /^(.*\.(scss$))[^.]*$/igm
directives  = require.context './scripts/', true, /^(.*\.(directive\.coffee$))[^.]*$/igm
controllers = require.context './scripts/', true, /^(.*\.(controller\.coffee$))[^.]*$/igm
views       = require.context './views/', true, /^(.*\.(jade$))[^.]*$/igm

requireContextFiles styles
requireContextFiles directives
requireContextFiles controllers

