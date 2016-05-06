'use strict'

import './auth.module.js'

import store from '../store.coffee'
import includes from 'lodash/includes'
import { decodeToken, getFreshToken, logout as doLogout } from 'tc-accounts'
import { setUser } from '../store/actions/user.js'

let currentUser = null

// export function loadUser() {
//   function loadUserSuccess(token) {
//     const profile = decodeToken( token )

//     if (profile.userId) {
//       currentUser = profile
//       currentUser.id = currentUser.userId
//       currentUser.role = 'customer'

//       if (includes(decodedToken.roles, 'Connect Copilot')) {
//         currentUser.role = 'copilot'
//       }

//       if (includes(decodedToken.roles, 'Connect Support')) {
//         currentUser.role = 'admin'
//       }

//       store.dispatch(setUser(currentUser))
//     }

//     return currentUser
//   }

//   return getFreshToken().then(loadUserSuccess)
// }

export function loadUser(profilesAPIService) {
  function getTokenSuccess(token) {
    const profile = decodeToken(token)
    const resource = profilesAPIService.get({
      id: profile.userId
    })

    return resource.$promise.then( (response) => {
      currentUser = response
      currentUser.id = currentUser.userId
      currentUser.role = 'customer'

      if (currentUser.isCopilot) {
        currentUser.role = 'copilot'
      }

      if (includes(profile.roles, 'Connect Copilot')) {
        currentUser.role = 'copilot'
      }


      if (includes(profile.roles, 'Connect Support')) {
        currentUser.role = 'admin'
      }

      store.dispatch(setUser(currentUser))

      return currentUser
    })
  }

  return getFreshToken().then(getTokenSuccess)
}

export function getCurrentUser() {
  return currentUser
}

export function logout() {
  return doLogout().then( () => currentUser = null )
}

const UserV3Service = function(profilesAPIService) {
  const angularLoadUser = () => loadUser(profilesAPIService)

  return {
    getCurrentUser,
    loadUser: angularLoadUser
  }
}

UserV3Service.$inject = ['profilesAPIService']

angular.module('auth').factory('UserV3Service', UserV3Service)