'use strict'

require('angular-jwt')

import { configureConnector, getFreshToken } from 'tc-accounts'
import { CONNECTOR_URL } from '../constants.js'

configureConnector({
  connectorUrl: CONNECTOR_URL,
  frameId: 'tc-accounts-iframe'
})

const dependencies = ['angular-jwt']

const config = function($httpProvider, jwtInterceptorProvider) {
  function jwtInterceptor() {
    return getFreshToken()
  }

  jwtInterceptorProvider.tokenGetter = jwtInterceptor

  $httpProvider.interceptors.push('jwtInterceptor')
}

config.$inject = ['$httpProvider', 'jwtInterceptorProvider']

angular.module('auth', dependencies).config(config)

// These must come after the module definition
require('./user-v3.service.js')