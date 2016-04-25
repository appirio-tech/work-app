'use strict'

import './auth.module.js'

import store from '../store.coffee'
import includes from 'lodash/includes'
import { decodeToken, getFreshToken, logout as doLogout } from 'tc-accounts'
import { setUser } from '../store/actions/user.js'

let currentUser = null

export function loadUser() {
  function loadUserSuccess(token) {
    const decodedToken = decodeToken( token )

    if (decodedToken.userId) {
      currentUser = decodedToken
      currentUser.id = currentUser.userId
      currentUser.role = 'customer'

      if (includes(decodedToken.roles, 'Connect Copilot')) {
        currentUser.role = 'copilot'
      }

      if (includes(decodedToken.roles, 'Connect Support')) {
        currentUser.role = 'admin'
      }

      store.dispatch(setUser(currentUser))
    }

    return currentUser
  }

  return getFreshToken().then(loadUserSuccess)
}

export function getCurrentUser() {
  return currentUser
}

export function logout() {
  return doLogout().then( () => currentUser = null )
}

const UserV3Service = function() {
  return {
    getCurrentUser,
    loadUser
  }
}

angular.module('appirio-tech-ng-auth').factory('UserV3Service', UserV3Service)