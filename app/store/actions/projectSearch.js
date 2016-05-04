import Schemas from '../middleware/schemas'
import isEqual from 'lodash/isEqual'

import callApi from '../middleware/api'

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

export function formatProjectSearchCall() {

}

export function loadProjectSearch() {
  return (dispatch, getState) => {
    const state = getState().projectSearch

    if (!isEqual(state.filters, state.currentFilters)) {
      dispatch({ type: CLEAR_PROJECT_SEARCH })
    }

    if (!state.moreResultsAvailable) {
      return Promise.resolve()
    }

    dispatch({ type: PROJECT_SEARCH_REQUEST })

    const config = {
      method: 'GET',
      endpoint: '/work',
      params: getparamsFromState(state),
      schema: Schemas.PROJECT_ARRAY
    }

    const success = (response) => {
      dispatch({
        response,
        type: PROJECT_SEARCH_SUCCESS,
        filters: state.filters,
        limit: state.limit
      })
    }

    const failure = () => {
      dispatch({ type: PROJECT_SEARCH_FAILURE })
    }

    return callApi(config).then(success, failure)
  }
}

function getparamsFromState(state) {
  const params = {
    limit: state.limit,
    offsetId: '1461797736608-50e9c212-f79f-4bc5-89af-cd69919b9b27',
    orderBy: 'modifiedAt',
    // filter: {
    //   name: 'match(Beta)'
    // }
  }
  
  return params
}