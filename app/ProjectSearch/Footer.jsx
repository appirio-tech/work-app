import React from 'react'
import { connect } from 'react-redux'
import { loadProjectSearch } from '../store/actions/projectSearch.js'

class Footer extends React.Component {
  render() {
    const { fetching, numberOfResults, moreResultsAvailable } = this.props
    const noResults = fetching === false && numberOfResults === 0

    if (fetching) {
      return <p>Searching...</p>
    } else if (noResults) {
      return <p>No results founds</p>
    } else if (moreResultsAvailable) {
      return <p onClick={this.props.loadProjectSearch}>Load more results</p>
    } else {
      return <p>No more results available</p>
    }
  }
}

const { bool, number, func } = React.PropTypes

Footer.propTypes = {
  fetching: bool.isRequired,
  numberOfResults: number.isRequired,
  moreResultsAvailable: bool.isRequired,
  loadProjectSearch: func.isRequired
}

function mapStateToProps(state) {
  return {
    fetching: state.projectSearch.fetching,
    numberOfResults: state.projectSearch.items.length,
    moreResultsAvailable: state.projectSearch.moreResultsAvailable
  }
}

const actionsToBind = {
  loadProjectSearch
}

export default connect(mapStateToProps, actionsToBind)(Footer)