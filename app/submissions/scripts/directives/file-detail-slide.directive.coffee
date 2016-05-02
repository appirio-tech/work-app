'use strict'

directive = ->
  restrict         : 'E'
  controller       : 'FileDetailSlideController as vm'
  template         : require('../../views/file-detail-slide.directive.jade')()
  scope            : 
    onFileChange:    '&'
  bindToController :
    files:           '='
    startingFile:    '='
    messages:        '='
    showMessages:    '='
    newMessage:      '='
    title:           '@'
    submitterAvatar: '@'
    submissionNumber:'@'
    submitterHandle: '@'
    userType:        '@'
    status:          '@'
    canComment:      '='
    toggleComments:  '&'
    sendMessage:     '&'
    ranksConfirmed:  '='
    messagesLoading: '='

angular.module('submissions').directive 'fileDetailSlide', directive