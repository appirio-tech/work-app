import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Controls from './Controls/Controls.js'
import List from './List/List.js'

export class Projects extends Component {
  render() {
    return <ul>
      <li>Projects</li>
      <li><Controls /></li>
      <li><List /></li>
    </ul>
  }
}

Projects.propTypes = {

}

const mapStoreToProps = (store, ownProps) => {
  return {}
}

const actionsToBind = {}

export default connect(mapStoreToProps, actionsToBind)(Projects)
