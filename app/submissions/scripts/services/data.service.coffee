'use strict'

isObject = (item) ->
  item != null && typeof item == 'object' && Array.isArray(item) == false

srv = ($injector, $rootScope) ->
  subscribe = (scope, subscriberOnChange, configs) ->
    unless angular.isArray configs[0]
      configs = [ configs ]

    services = configs.map (config) ->
      [instance, method, args...] = config

      instance : instance
      method   : method
      args     : args

    dataOnChange = ->
      data = services.map (service) ->
        service.instance[service.method].apply null, service.args

      itemReady = (acc, item) ->
        ready = true

        if item == undefined || item == null
          ready = false

        if isObject(item) && Object.keys(item).length <= 0
          ready = false

        if item && item._pending
          ready = false

        acc && ready

      if data.reduce itemReady, true
        subscriberOnChange.apply null, data

    services.forEach (service) ->
      destroyServiceListener = $rootScope.$on "#{service.instance.name}:changed:#{service.args.join(':')}", ->
        dataOnChange()

      if scope
        scope.$on '$destroy', ->
          destroyServiceListener()

    dataOnChange()

  subscribe: subscribe

srv.$inject = ['$injector', '$rootScope']

angular.module('submissions').factory 'DataService', srv