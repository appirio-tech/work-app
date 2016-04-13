import React, { PropTypes } from 'react'

export default function Card(props) {
  const { id, name } = props.project

  return <li>{name}</li>
}

Card.propTypes = {}
