'use strict'

directive = ->
  restrict    : 'E'
  controller  : 'ImageSlideContainerController as vm'
  template    : '<image-slideshow-modal ng-if="vm.modalActive" files="vm.images" starting-file="vm.startingFile" handle-close="handleClose" report-date="{{reportDate}}" avatar="{{avatar}}" handle="{{handle}}"></image-slideshow-modal>'
  scope       :
    handle:         '@'
    avatar:         '@'
    reportDate:     '@'
    reportId:       '@'
    startingFileId: '@'
    projectId:      '@'
    handleClose:    '='

angular.module('appirio-tech-ng-timeline').directive 'imageSlideContainer', directive