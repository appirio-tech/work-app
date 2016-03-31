'use strict'

require('angular-jwt')

import { getToken, refreshToken } from 'appirio-accounts-app/connector/connector-wrapper.js'
import { isTokenExpired } from 'appirio-accounts-app/core/token.js'

const dependencies = ['angular-jwt']

const config = function($httpProvider, jwtInterceptorProvider) {
  let tokenPromise = null

  function jwtInterceptor() {
    if (tokenPromise) {
      return tokenPromise
    }

    tokenPromise = getToken()
      .then( token => {
        if (token === null) {
          return token
        }

        if (!isTokenExpired(token, 60)) {
          return token
        }

        return refreshToken()
      })
      .then( token => {
        tokenPromise = null
        return token
      })
      .catch( (e) => {
        tokenPromise = null
        return token
      })
  }

  jwtInterceptorProvider.tokenGetter = jwtInterceptor

  $httpProvider.interceptors.push('jwtInterceptor')
}

config.$inject = ['$httpProvider', 'jwtInterceptorProvider']

angular.module('appirio-tech-ng-auth', dependencies).config(config)

// These must come after the module definition
require('./user-v3.service.js')