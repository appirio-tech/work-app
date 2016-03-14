import configureMockStore from 'redux-mock-store'
import find from 'lodash/find'
import thunk from 'redux-thunk'
import nock from 'nock'

import {
  clearProjectSearch,
  loadProjectSearch,
  setProjectSeachFilters
} from './projectSearch.js'

import {
  CLEAR_PROJECT_SEARCH,
  PROJECT_SEARCH_REQUEST,
  PROJECT_SEARCH_SUCCESS,
  PROJECT_SEARCH_FAILURE,
  SET_PROJECT_SEARCH_FILTERS
} from '../constants.js'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('projectSearch Actions:', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('clearProjectSearch', () => {
    it(`should create ${CLEAR_PROJECT_SEARCH}`, () => {
      const expectedAction = {
        type: CLEAR_PROJECT_SEARCH
      }

      clearProjectSearch().should.deep.equal(expectedAction)
    })
  })

  describe('setProjectSeachFilters', () => {
    it(`should create ${SET_PROJECT_SEARCH_FILTERS} with the passed filters`, () => {
      const filters = {
        query: 'foo'
      }

      const expectedAction = {
        type: SET_PROJECT_SEARCH_FILTERS,
        filters
      }

      setProjectSeachFilters(filters).should.deep.equal(expectedAction)
    })
  })

  describe('loadProjectSearch', () => {
    it(`should dispatch ${CLEAR_PROJECT_SEARCH} if filters have changed`, () => {
      const store = mockStore({
        projectSearch: {
          previousFilters: { projectType: 'DESIGN' },
          filters: { projectType: 'DESIGN_AND_CODE' }
        }
      })

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[0].should.deep.equal({ type: CLEAR_PROJECT_SEARCH })
      })
    })

    it(`should not proceed if there are not more results available`, () => {
      const store = mockStore({
        projectSearch: {
          moreResultsAvailable: false
        }
      })

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions().length.should.equal(0)
      })
    })

    it(`should include metadata(filters, limit) in the action bodies`, () => {
      const store = mockStore({
        projectSearch: {
          filters: {
            query: 'foo'
          },
          limit: 20
        }
      })

      return store.dispatch(loadProjectSearch()).then( () => {
        find(store.getActions(), (a) => a.type === PROJECT_SEARCH_SUCCESS)

        successAction.limit.should.equal(store.projectSearch.limit)
        successAction.filters.should.deep.equal(store.projectSearch.filters)
      })
    })

    it(`should dispatch ${PROJECT_SEARCH_REQUEST} when invoked`, () => {
      const store = mockStore({})

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[0].should.deep.equal({ type: PROJECT_SEARCH_REQUEST })
      })
    })

    it(`should dispatch ${PROJECT_SEARCH_SUCCESS} when invoked`, () => {
      const store = mockStore({})

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[1].should.deep.equal({ type: PROJECT_SEARCH_SUCCESS })
      })
    })

    it(`should dispatch ${PROJECT_SEARCH_FAILURE} when the request fails`, () => {
      const store = mockStore({})

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[1].should.deep.equal({ type: PROJECT_SEARCH_FAILURE })
      })
    })

    it(`should not refetch if the filters and page haven't changed`, () => {})
  })
})