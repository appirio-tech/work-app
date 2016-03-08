import React, { PropTypes } from 'react'

import Controls from './Controls/Controls.js'
import List from './List/List.js'

export default function Projects(props) {
  return <ul>
    <li>Projects</li>
    <li><Controls /></li>
    <li><List /></li>
  </ul>
}

Projects.propTypes = {}
