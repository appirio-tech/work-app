'use strict'

OptimistHelpers = (options = {}) ->
  timestamp = ->
    now = new Date()
    now.toISOString()

  isObject = (item) ->
    item != null && typeof item == 'object' && Array.isArray(item) == false

  mask = (source, maskObj) ->
    masked = {}

    for own name, value of source
      if maskObj.hasOwnProperty name
        if isObject value
          masked[name] = mask value, maskObj[name]
        else
          masked[name] = value

    masked

  filter = (source, filterObj) ->
    filtered = {}

    for own name, value of source
      if filterObj.hasOwnProperty name
        if isObject(value) && isObject(filterObj[name])
          filtered[name] = filter value, filterObj[name]
      else
        filtered[name] = angular.copy value

    filtered

  walk = (collection, action) ->
    for own name, value of collection
      if isObject(value)
        walk value, action
      else
        action value, name, collection

  flatWalkTandem = (target, source, action) ->
    combinedKeys = {}

    for own name, value of target
      combinedKeys[name] = true

    for own name, value of source
      combinedKeys[name] = true

    for own name, value of combinedKeys
      targetValue = target[name]
      sourceValue = source[name]

      action targetValue, sourceValue, name, target, source

  merge = (target, source) ->
    result = {}

    action = (targetValue, sourceValue, name) ->
      if isObject(targetValue) || isObject(sourceValue)
        result[name] = merge (targetValue || {}), (sourceValue || {})
      else
        result[name] = if sourceValue == undefined then targetValue else sourceValue

    flatWalkTandem target, source, action

    result

  timestamp      : timestamp
  isObject       : isObject
  mask           : mask
  filter         : filter
  walk           : walk
  flatWalkTandem : flatWalkTandem
  merge          : merge

OptimistHelpers.$inject = ['$rootScope']

angular.module('appirio-tech-ng-optimist').factory 'OptimistHelpers', OptimistHelpers