'use strict'

directive = ->
  restrict: 'A'
  scope:
    onDrop: '&'
  link: (scope, element, attr, ctrl) ->
    el = element[0]

    noDrag = (el) ->
      el.draggable = false

      if el.children
        for child in el.children
          noDrag child

    noDrag(el)
    
    el.draggable = true

    dragstart = (e) ->
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('submissionId', e.target.dataset.id);
      this.classList.add('drag');
      return false;

    dragend = (e) ->
      this.classList.remove('drag');
      return false;

    el.addEventListener 'dragstart', dragstart, false
    el.addEventListener 'dragend', dragend, false

angular.module('submissions').directive 'draggable', directive