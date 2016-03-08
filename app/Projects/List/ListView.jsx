import React, { PropTypes } from 'react'

import Card from '../Card/Card.js'

export default function ListView(props) {
  return <ul>
    <li>List</li>
    <li><Card /></li>
    <li><Card /></li>
    <li><Card /></li>
  </ul>
}

ListView.propTypes = {}
