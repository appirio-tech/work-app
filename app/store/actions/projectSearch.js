import Schemas from '../middleware/schemas'
import isEqual from 'lodash/isEqual'
import last from 'lodash/last'

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

export function loadProjectSearch() {
  return (dispatch, getState) => {
    let state = getState()

    if (!isEqual(state.projectSearch.filters, state.projectSearch.previousFilters)) {
      dispatch({ type: CLEAR_PROJECT_SEARCH })

      state = getState()
    }

    if (!state.projectSearch.moreResultsAvailable) {
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
        filters: state.projectSearch.filters
      })
    }

    const failure = () => {
      dispatch({ type: PROJECT_SEARCH_FAILURE })
    }

    return callApi(config).then(success, failure)
  }
}

function getparamsFromState(state) {
  const filters = state.projectSearch.filters
  const userId = state.user.id

  const params = {
    limit: filters.limit,
    orderBy: 'modifiedAt'
  }

  if (state.projectSearch.items.length > 0) {
    params.offsetId = last(state.projectSearch.items)
  }

  if (filters.query.length >= 3) {
    params.filter = Object.assign( {}, params.filter, {
      name: 'match(' + filters.query + ')'
    } )
  }

  if (filters.projectType.length > 0) {
    params.filter = Object.assign( {}, params.filter, {
      projectType: 'in(' + filters.projectType.join(',') + ')'
    } )
  }

  if (filters.status.length > 0) {
    params.filter = Object.assign( {}, params.filter, {
      status: 'in(' + filters.status.join(',') + ')'
    } )
  }

  if (filters.searchType === 'OWN') {
    params.filter = Object.assign( {}, params.filter, {
      ownerId: userId
    } )
  }

  if (filters.searchType === 'UNCLAIMED') {
    params.filter = Object.assign( {}, params.filter, {
      copilotId: 'unassigned'
    } )
  }

  return params
}