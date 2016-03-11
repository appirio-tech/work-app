import configureMockStore from 'redux-mock-store'
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

describe('projectSearch Actions --', () => {
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
    it(`should dispatch ${PROJECT_SEARCH_REQUEST} when invoked`, () => {
      const store = mockStore({})
      
      store.dispatch(loadProjectSearch())
      store.getActions()[0].should.deep.equal({ type: PROJECT_SEARCH_REQUEST })
    })

    it(`should dispatch ${PROJECT_SEARCH_REQUEST} when invoked`, (done) => {
      const store = mockStore({})
      
      store.dispatch(loadProjectSearch()).then( () => {
        store.getActions()[0].should.deep.equal({ type: PROJECT_SEARCH_REQUEST })
        store.getActions()[1].should.deep.equal({ type: PROJECT_SEARCH_SUCCESS })
        done()
      })
    })
  })
})