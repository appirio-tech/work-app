'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/thumbnail-notification.directive.jade')()
  scope      :
    unreadMessages: '='
    totalMessages: '='

angular.module('submissions').directive 'thumbnailNotification', directive