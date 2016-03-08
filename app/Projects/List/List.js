import React, { Component, PropTypes } from 'react'

import Card from '../Card/Card.js'

export default class ProjectsControls extends Component {
  render() {
    return <ul>
      <li>List</li>
      <li><Card /></li>
      <li><Card /></li>
      <li><Card /></li>
    </ul>
  }
}

ProjectsControls.propTypes = {

}
