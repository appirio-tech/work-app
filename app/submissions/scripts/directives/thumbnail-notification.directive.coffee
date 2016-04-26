'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/thumbnail-notification.directive.jade')()
  scope      :
    unreadMessages: '='
    totalMessages: '='

angular.module('appirio-tech-submissions').directive 'thumbnailNotification', directive