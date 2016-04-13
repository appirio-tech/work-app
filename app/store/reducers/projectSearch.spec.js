import projectSearch from './projectSearch.js'
import freeze from 'deep-freeze-node'

import { CLEAR_PROJECT_SEARCH,
  PROJECT_SEARCH_REQUEST,
  PROJECT_SEARCH_SUCCESS,
  PROJECT_SEARCH_FAILURE,
  SET_PROJECT_SEARCH_FILTERS } from '../constants.js'

describe('projectSearch Reducer:', () => {
  describe(CLEAR_PROJECT_SEARCH, () => {
    const before = freeze({
      items: ['1', '2', '3'],
      moreResultsAvailable: false,
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

    it('should reset moreResultsAvailable', () => {
      after.moreResultsAvailable.should.equal(true)
    })
  })

  describe(PROJECT_SEARCH_REQUEST, () => {
    const before = freeze({
      fetching: false,
      error: 'oops'
    })

    const action = {
      type: PROJECT_SEARCH_REQUEST
    }

    const after = projectSearch(before, action)

    it('should set fetching to true', () => {
      after.fetching.should.equal(true)
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
      fetching: true,
      lastUpdated: yesterday.toISOString(),
      filters: {
        projectType: 'DESIGN'
      },
      moreResultsAvailable: true
    })

    const action = {
      type: PROJECT_SEARCH_SUCCESS,
      response: {
        result: ['2', '3']
      },
      filters: {
        projectType: 'DESIGN'
      },
      limit: 3
    }

    const after = projectSearch(before, action)

    it('should join the result with the current items', () => {
      after.items.should.deep.equal(['1', '2', '3'])
    })

    it('should set fetching to false', () => {
      after.fetching.should.equal(false)
    })

    it('should update lastUpdated', () => {
      after.lastUpdated.should.be.above(yesterday.toISOString())
    })

    it('should cache the last used filter set', () => {
      after.previousFilters.should.deep.equal(action.filters)
    })

    it('should set moreResultsAvailable to false if the result set is less than the limit', () => {
      after.moreResultsAvailable.should.equal(false)
    })
  })

  describe(PROJECT_SEARCH_FAILURE, () => {
    const before = freeze({
      fetching: true,
      error: ''
    })

    const action = {
      type: PROJECT_SEARCH_FAILURE,
      error: 'oops'
    }

    const after = projectSearch(before, action)

    it('should set fetching to false', () => {
      after.fetching.should.equal(false)
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