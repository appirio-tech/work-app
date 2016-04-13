import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadProjectSearch } from '../store/actions/projectSearch.js'

import Controls from './Controls/Controls.js'
import Card from './Card/Card.jsx'

class ProjectSearch extends Component {
  constructor(props) {
    super(props)

    props.loadProjectSearch()
  }

  render() {
    return (
      <div>
        <Controls />
        <ul>
          { this.props.projects.map( project => <Card key={project.id} project={project} />) }
        </ul>
      </div>
    )
  }
}

ProjectSearch.propTypes = {}

function mapStateToProps(state, ownProps) {
  return {
    projects: state.projectSearch.items.map( (id) => state.entities.projects[id] )
  }
}

const actionsToBind = {
  loadProjectSearch
}

export default connect(mapStateToProps, actionsToBind)(ProjectSearch)