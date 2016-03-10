import projectSearch from './projectSearch.js'
import freeze from 'deep-freeze-node'

describe('Projects Search Reducer --', () => {
  describe('PROJECTS_CLEAR', () => {
    const before = freeze({
      items: ['1', '2', '3'],
      error: 'oops'
    })

    const action = {
      type: 'PROJECTS_CLEAR'
    }

    const after = projectSearch(before, action)

    it('should clear the current items', () => {
      after.items.should.an('array')
      after.items.length.should.equal(0)
    })

    it('should clear the error message', () => {
      after.error.should.equal('')
    })
  })

  describe('PROJECTS_FETCH_REQUEST', () => {
    const before = freeze({
      isFetching: false,
      error: 'oops'
    })

    const action = {
      type: 'PROJECTS_FETCH_REQUEST'
    }

    const after = projectSearch(before, action)

    it('should set fetching to true', () => {
      after.isFetching.should.equal(true)
    })

    it('should clear the error message', () => {
      after.error.should.equal('')
    })
  })

  describe('PROJECTS_FETCH_SUCCESS', () => {
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
      type: 'PROJECTS_FETCH_SUCCESS',
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

  describe('PROJECTS_FETCH_FAILURE', () => {
    const before = freeze({
      isFetching: true,
      error: ''
    })

    const action = {
      type: 'PROJECTS_FETCH_FAILURE',
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

  describe('PROJECTS_SET_FILTERS', () => {
    const before = freeze({})

    const action = {
      type: 'PROJECTS_SET_FILTERS',
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