import configureMockStore from 'redux-mock-store'
import find from 'lodash/find'
import thunk from 'redux-thunk'
import nock from 'nock'
import { defaults } from '../reducers/projectSearch.js'
import { API_URL } from '../../constants.js'

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
          filters: { projectType: 'DESIGN_AND_CODE' },
          moreResultsAvailable: true
        }
      })

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[0].should.deep.equal({ type: CLEAR_PROJECT_SEARCH })
      })
    })

    it('should not proceed if there are not more results available', () => {
      const store = mockStore({
        projectSearch: {
          moreResultsAvailable: false
        }
      })

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions().length.should.equal(0)
      })
    })

    it('should include metadata(filters, limit) in the action bodies', () => {
      const store = mockStore({ projectSearch: defaults })

      nock(API_URL)
        .get(/\/v3\/projects.*/)
        .reply(200, 'success, yay!')

      return store.dispatch(loadProjectSearch()).then( () => {
        console.log(store.getActions())
        const successAction = find(store.getActions(), (a) => a.type === PROJECT_SEARCH_SUCCESS)

        successAction.limit.should.equal(store.getState().projectSearch.limit)
        successAction.filters.should.deep.equal(store.getState().projectSearch.filters)
      })
    })

    it(`should dispatch ${PROJECT_SEARCH_REQUEST} when invoked`, () => {
      const store = mockStore({ projectSearch: defaults })

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[1].should.deep.equal({ type: PROJECT_SEARCH_REQUEST })
      })
    })

    it(`should dispatch ${PROJECT_SEARCH_SUCCESS} when the request succeeds`, () => {
      const store = mockStore({ projectSearch: defaults })

      nock(API_URL)
        .get(/\/v3\/projects.*/)
        .reply(200, 'success, yay!')

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[2].should.deep.equal({
          type: PROJECT_SEARCH_SUCCESS,
          filters: {},
          limit: 20
        })
      })
    })

    it(`should dispatch ${PROJECT_SEARCH_FAILURE} when the request fails`, () => {
      const store = mockStore({ projectSearch: defaults })

      nock(API_URL)
        .get(/\/v3\/projects.*/)
        .reply(404, 'failure, boo!')

      return store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[2].should.deep.equal({ type: PROJECT_SEARCH_FAILURE })
      })
    })
  })
})