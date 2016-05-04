import React, { PropTypes } from 'react'

export default function Card(props) {
  const { id, name } = props.project

  return <li>{id} - {name}</li>
}

Card.propTypes = {}
