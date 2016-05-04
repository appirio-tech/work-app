import union from 'lodash/union'

import { CLEAR_PROJECT_SEARCH,
  PROJECT_SEARCH_REQUEST,
  PROJECT_SEARCH_SUCCESS,
  PROJECT_SEARCH_FAILURE,
  SET_PROJECT_SEARCH_FILTERS } from '../constants.js'

export const defaults = {
  items: [],
  fetching: false,
  lastUpdated: (new Date()).toISOString(),
  error: '',
  moreResultsAvailable: true,
  limit: 2,
  filters: {},
  previousFilters: {}
}

export default function projectSearch(state = defaults, action) {
  switch(action.type) {
    case CLEAR_PROJECT_SEARCH:
      return Object.assign({}, state, defaults)

    case PROJECT_SEARCH_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        error: ''
      })

    case PROJECT_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        items: union(state.items, action.response.result),
        fetching: false,
        lastUpdated: (new Date()).toISOString(),
        previousFilters: Object.assign({}, action.filters),
        moreResultsAvailable: action.response.result.length >= action.limit
      })

    case PROJECT_SEARCH_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error
      })

    case SET_PROJECT_SEARCH_FILTERS:
      return Object.assign({}, state, {
        filters: action.filters
      })

    default:
      return state
  }
}