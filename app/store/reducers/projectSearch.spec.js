import projectSearch from './projectSearch.js'
import freeze from 'deep-freeze-node'

import { CLEAR_PROJECT_SEARCH,
  PROJECT_SEARCH_REQUEST,
  PROJECT_SEARCH_SUCCESS,
  PROJECT_SEARCH_FAILURE,
  SET_PROJECT_SEARCH_FILTERS } from '../constants.js'

xdescribe('projectSearch Reducer --', () => {
  describe(CLEAR_PROJECT_SEARCH, () => {
    const before = freeze({
      items: ['1', '2', '3'],
      error: 'oops'
    })

    const action = {
      type: CLEAR_PROJECT_SEARCH
    }

    const after = projectSearch(before, action)

    it('should clear the current items', () => {
      after.items.should.be.an('array')
      after.items.length.should.equal(0)
    })

    it('should clear the error message', () => {
      after.error.should.equal('')
    })
  })

  describe(PROJECT_SEARCH_REQUEST, () => {
    const before = freeze({
      isFetching: false,
      error: 'oops'
    })

    const action = {
      type: PROJECT_SEARCH_REQUEST
    }

    const after = projectSearch(before, action)

    it('should set fetching to true', () => {
      after.isFetching.should.equal(true)
    })

    it('should clear the error message', () => {
      after.error.should.equal('')
    })
  })

  describe(PROJECT_SEARCH_SUCCESS, () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const before = freeze({
      items: ['1'],
      isFetching: true,
      lastUpdated: yesterday.toISOString(),
      filters: {
        projectType: 'DESIGN'
      }
    })

    const action = {
      type: PROJECT_SEARCH_SUCCESS,
      response: {
        totalItems: 500,
        result: ['2', '3']
      }
    }

    const after = projectSearch(before, action)

    it('should join the result with the current items', () => {
      after.items.should.deep.equal(['1', '2', '3'])
    })

    it('should set fetching to false', () => {
      after.isFetching.should.equal(false)
    })

    it('should set totalItems', () => {
      after.totalItems.should.equal(500)
    })

    it('should update lastUpdated', () => {
      after.lastUpdated.should.be.above(yesterday.toISOString())
    })

    it('should cache the last filter set', () => {
      after.previousFilters.should.deep.equal(after.filters)
    })
  })

  describe(PROJECT_SEARCH_FAILURE, () => {
    const before = freeze({
      isFetching: true,
      error: ''
    })

    const action = {
      type: PROJECT_SEARCH_FAILURE,
      error: 'oops'
    }

    const after = projectSearch(before, action)

    it('should set fetching to false', () => {
      after.isFetching.should.equal(false)
    })

    it('should set error', () => {
      after.error.should.equal('oops')
    })
  })

  describe(SET_PROJECT_SEARCH_FILTERS, () => {
    const before = freeze({})

    const action = {
      type: SET_PROJECT_SEARCH_FILTERS,
      filters: {
        projectType: 'DESIGN'
      }
    }

    const after = projectSearch(before, action)

    it('should set filters', () => {
      after.filters.should.deep.equal(action.filters)
    })
  })
})