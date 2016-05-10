import './Controls.scss'

import React from 'react'
import { connect } from 'react-redux'
import { loadProjectSearch } from '../store/actions/projectSearch.js'
import QueryInput from './QueryInput.jsx'
import StatusSelect from './StatusSelect.jsx'

class Controls extends React.Component {
  handleSubmit(event) {
    event.preventDefault()
    this.props.loadProjectSearch()
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this)

    return (
      <form className="project-search-controls" onSubmit={handleSubmit}>
        <QueryInput />
        <StatusSelect />
      </form>
    )
  }
}

const { func } = React.PropTypes

Controls.propTypes = {
  loadProjectSearch: func.isRequired
}

const actionsToBind = {
  loadProjectSearch
}

export default connect(null, actionsToBind)(Controls)