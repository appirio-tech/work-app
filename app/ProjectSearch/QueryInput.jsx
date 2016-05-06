import debounce from 'lodash/debounce'
import React from 'react'
import { connect } from 'react-redux'
import { setProjectSeachFilters, loadProjectSearch } from '../store/actions/projectSearch.js'

class QueryInputs extends React.Component {
  constructor(props) {
    super(props)
    
    this.debouncedLoadProjectSearch = debounce(this.props.loadProjectSearch, 400)
  }

  handleChange(event) {
    const { setProjectSeachFilters } = this.props

    setProjectSeachFilters({ query: event.target.value })
    this.debouncedLoadProjectSearch()
  }

  render() {
    const { query } = this.props
    const handleChange = this.handleChange.bind(this)

    return (
      <input type="text" value={query} onChange={handleChange} />
    )
  }
}

const { string, func } = React.PropTypes

QueryInputs.propTypes = {
  query: string.isRequired,
  setProjectSeachFilters: func.isRequired,
  loadProjectSearch: func.isRequired
}

function mapStateToProps(state) {
  return {
    query: state.projectSearch.filters.query
  }
}

const actionsToBind = {
  setProjectSeachFilters,
  loadProjectSearch
}

export default connect(mapStateToProps, actionsToBind)(QueryInputs)