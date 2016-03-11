import callApi from '../middleware/api'
import Schemas from '../middleware/schemas'

import {
  CLEAR_PROJECT_SEARCH,
  PROJECT_SEARCH_REQUEST,
  PROJECT_SEARCH_SUCCESS,
  PROJECT_SEARCH_FAILURE,
  SET_PROJECT_SEARCH_FILTERS
} from '../constants.js'

export function clearProjectSearch() {
  return { type: CLEAR_PROJECT_SEARCH }
}

export function setProjectSeachFilters(filters) {
  return {
    type: SET_PROJECT_SEARCH_FILTERS,
    filters
  }
}

export function loadProjectSearch(limit) {
  return (dispatch, getState) => {
    dispatch({ type: PROJECT_SEARCH_REQUEST })

    const success = () => {
      dispatch({ type: PROJECT_SEARCH_SUCCESS })
    }

    const failure = () => {
      dispatch({ type: PROJECT_SEARCH_FAILURE })
    }

    return Promise.resolve().then(success, failure)
  }
}