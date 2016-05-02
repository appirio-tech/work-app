'use strict'

OptimistCollection = (OptimistHelpers, OptimistModel) ->
  Collection = (options = {}) ->
    @configure options

    @

  Collection.prototype.configure = (options) ->
    @_collection = []
    @_meta = {}
    @_defaults =
      updateCallback: options.updateCallback || angular.noop
      matchByProp: options.matchByProp || 'id'
      propsToIgnore: options.propsToIgnore || []

  Collection.prototype.get = ->
    collection = @_collection.map (item) ->
        item.get()

    angular.merge collection, @_meta

  Collection.prototype.getShallow = ->
    collection = angular.copy @_collection

    angular.merge collection, @_meta

  Collection.prototype.clearError = ->
    if @_meta._error
      delete @_meta._error

  Collection.prototype.fetch = (options = {}) ->
    apiCall              = options.apiCall
    updateCallback       = options.updateCallback || @_defaults.updateCallback
    clearErrorsOnSuccess = options.clearErrorsOnSuccess != false
    propsToIgnore        = options.propsToIgnore || @_defaults.propsToIgnore

    @_meta._pending = true

    updateCallback(@_collection)

    request = apiCall()

    request.then (response) =>
      @_meta._lastUpdated = OptimistHelpers.timestamp()

      if clearErrorsOnSuccess
        @clearError()

      @_collection = response.map (item) =>
        new OptimistModel
          data: item
          updateCallback: updateCallback
          propsToIgnore: propsToIgnore

      response

    request.catch (err) =>
      @_meta._error = err

    request.finally () =>
      @_meta._pending = false
      updateCallback(@_collection)

  Collection.prototype.findWhere = (filters) ->
    @_collection.filter (item) ->
      itemData = item.get()

      for name, value of filters
        unless itemData[name] == value
          return false

      true

  Collection.prototype.findOneWhere = (filters) ->
    @findWhere(filters)[0]

  Collection

OptimistCollection.$inject = ['OptimistHelpers', 'OptimistModel']

angular.module('appirio-tech-ng-optimist').factory 'OptimistCollection', OptimistCollection