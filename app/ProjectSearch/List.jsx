import React from 'react'
import { connect } from 'react-redux'
import { loadProjectSearch } from '../store/actions/projectSearch.js'
import Card from './Card.jsx'

class List extends React.Component {
  constructor(props) {
    super(props)

    props.loadProjectSearch()
  }

  render() {
    const cards = this.props.projects.map( project => <Card key={project.id} project={project} />)

    return <ul>{ cards }</ul>
  }
}

const { arrayOf, shape, string } = React. PropTypes

List.propTypes = {
  projects: arrayOf( shape({
    id: string.isRequired,
    name: string.isRequired
  }) ).isRequired
}

function mapStateToProps(state) {
  return {
    projects: state.projectSearch.items.map( (id) => state.entities.projects[id] )
  }
}

const actionsToBind = {
  loadProjectSearch
}

export default connect(mapStateToProps, actionsToBind)(List)