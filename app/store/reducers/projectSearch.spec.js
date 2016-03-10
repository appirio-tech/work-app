import projectSearch from './projectSearch.js'
import freeze from 'deep-freeze-node'

describe('projectSearch reducer', () => {
  describe('PROJECTS_FETCH_REQUEST', () => {
    it('should set fetching to true', () => {
      const before = freeze({
        isFetching: false
      })

      const action = {
        type: 'PROJECTS_FETCH_REQUEST'
      }

      const after = projectSearch(before, action)

      after.isFetching.should.equal(true)
    })
  })
})