'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'ImageSlideShowModalController as vm'
  template    : require('../views/image-slideshow-modal.directive.jade')()
  scope       :
    showModal:    '@'
    handle:       '@'
    avatar:       '@'
    reportDate:   '@'
    files:        '='
    startingFile: '='
    handleClose:  '='

angular.module('appirio-tech-ng-timeline').directive 'imageSlideshowModal', directive