import callApi from '../middleware/api'
import Schemas from '../middleware/schemas'

export const SET_USER = 'SET_USER'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

export function loadUser(id) {
  return (dispatch, getState) => {
    if (getState().entities.users[id]) { return null }

    dispatch({ type: USER_REQUEST })

    const config = {
      endpoint: `/profiles/${id}`,
      schema: Schemas.USER
    }

    const success = response => {
      return dispatch({
        response,
        type: USER_SUCCESS
      })
    }

    const failure = error => {
      return dispatch({
        type: USER_FAILURE,
        error: error.message || 'Something bad happened'
      })
    }

    return callApi(config).then(success).catch(failure)
  }
}

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST'
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS'
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE'

export function updatePassword({ currentPassword, password }) {
  return (dispatch, getState) => {
    const id = getState().user.id

    const data = {
      param: {
        credential: {
          currentPassword,
          password
        }
      }
    }

    dispatch({ type: USER_REQUEST })

    const config = {
      endpoint: `/users/${id}/`,
      method: 'PATCH',
      ignoreResult: true,
      data
    }

    const success = response => {
      return dispatch({
        type: USER_SUCCESS
      })
    }

    const failure = error => {
      return dispatch({
        type: USER_FAILURE,
        error: error.message || 'Something bad happened'
      })
    }

    return callApi(config).then(success).catch(failure)
  }
}