'use strict'

import includes from 'lodash/includes'
import merge from 'lodash/merge'
// TODO: Move registration to accounts.topcoder.com
import { registerUser} from 'tc-accounts/core/auth.js'
import { decodeToken, getToken } from 'tc-accounts'

const UserV3Service = function() {
  let currentUser = null

  const loadUser = function() {
    return getToken()
      .then( token => {
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
        }

        return currentUser
      })
  }

  const getCurrentUser = function() {
    return currentUser
  }

  const createUser = function(body) {
    return registerUser(body)
  }

  return {
    getCurrentUser: getCurrentUser,
    createUser: createUser,
    loadUser: loadUser
  }
}

angular.module('appirio-tech-ng-auth').factory('UserV3Service', UserV3Service)