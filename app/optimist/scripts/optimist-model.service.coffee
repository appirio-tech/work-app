'use strict'

OptimistModel = (OptimistHelpers) ->
  Model = (options = {}) ->
    @configure options

    @

  Model.prototype.configure = (options) ->
    @_data = angular.copy(options.data || {})
    @_defaults =
      updateCallback: options.updateCallback || angular.noop
      propsToIgnore: options.propsToIgnore || []

  Model.prototype.get = ->
    angular.copy @_data

  isMeta = (name) ->
    pending = name.indexOf('_pending') >= 0
    error = name.indexOf('_error') >= 0
    backup = name.indexOf('_backup') >= 0
    lastUpdated = name.indexOf('_lastUpdated') >= 0

    pending || error || backup || lastUpdated

  Model.prototype.getClean = ->
    data = angular.copy(@_data)

    OptimistHelpers.walk data, (value, name, collection) ->
      if isMeta(name)
        delete collection[name]

    data

  Model.prototype.set = (options = {}) ->
    updates        = angular.copy(options.updates || @_data)
    updateCallback = options.updateCallback || @_defaults.updateCallback
    updateValues   = options.updateValues || false
    setPending     = options.setPending || false
    clearPending   = options.clearPending || false
    setBackup      = options.setBackup || false
    restoreBackup  = options.restoreBackup || false
    setError       = options.setError || false
    error          = options.error || ''
    clearError     = options.clearError || false
    propsToIgnore  = options.propsToIgnore || @_defaults.propsToIgnore

    if propsToIgnore
      updates = OptimistHelpers.filter updates, propsToIgnore

    if setBackup
      OptimistHelpers.walk @_data, (value, name, collection) ->
        unless isMeta(name)
          collection["#{name}_backup"] = collection[name]

    OptimistHelpers.walk updates, (value, name, collection) ->
      unless isMeta(name)
        if setPending
          collection["#{name}_pending"] = true

        if clearPending
          collection["#{name}_pending"] = false

        if restoreBackup
          collection[name] = collection["#{name}_backup"]

        if setError
          collection["#{name}_error"] = error

        if clearError
          collection["#{name}_error"] = false

        unless updateValues || restoreBackup
          delete collection[name]

    @_data = OptimistHelpers.merge @_data, updates

    updateCallback(@_data)

  Model.prototype.fetch = (options = {}) ->
    apiCall              = options.apiCall || angular.noop
    updateCallback       = options.updateCallback || @_defaults.updateCallback
    handleResponse       = options.handleResponse != false
    clearErrorsOnSuccess = options.clearErrorsOnSuccess != false
    propsToIgnore        = options.propsToIgnore || @_defaults.propsToIgnore

    @_data._pending = true

    updateCallback(@_data)

    request = apiCall()

    request.then (response) =>
      @_data._lastUpdated = OptimistHelpers.timestamp()

      if clearErrorsOnSuccess
        if @_data._error
          delete @_data._error

      if handleResponse
        @set
          updates: response
          updateValues: true
          propsToIgnore: propsToIgnore

      response

    request.catch (err) =>
      @_data._error = err

    request.finally () =>
      delete @_data._pending
      updateCallback(@_data)

  Model.prototype.restore = (updates) ->
    @set
      updates: updates
      restoreBackup = true

  Model.prototype.save = (options = {}) ->
    updates              = options.updates
    apiCall              = options.apiCall || angular.noop
    updateCallback       = options.updateCallback || @_defaults.updateCallback
    handleResponse       = options.handleResponse != false
    clearErrorsOnSuccess = options.clearErrorsOnSuccess != false
    rollbackOnFailure    = options.rollbackOnFailure || false
    propsToIgnore        = options.propsToIgnore || @_defaults.propsToIgnore

    @set
      updates: updates
      setPending: true
      updateCallback: updateCallback

    success = (response) =>
      @_data._lastUpdated = OptimistHelpers.timestamp()

      if handleResponse
        if updates
          response = OptimistHelpers.mask response, updates

        @set
          updates: response
          updateValues: true
          clearPending: true
          clearError: clearErrorsOnSuccess
          updateCallback: updateCallback
          propsToIgnore: propsToIgnore

      response

    failure = (err) =>
      @set
        updates: updates
        setError: true
        error: err
        restoreBackup: rollbackOnFailure

      throw new Error('Unable to apply updates due to API failure')

    apiCall( @getClean() ).then(success, failure)

  Model.prototype.update = (options = {}) ->
    @set
      updates        : options.updates || []
      updateCallback : options.updateCallback || @_defaults.updateCallback
      updateValues   : true
      setPending     : true

    @save(options)

  Model

OptimistModel.$inject = ['OptimistHelpers']

angular.module('appirio-tech-ng-optimist').factory 'OptimistModel', OptimistModel