import React from 'react'

export default function Card(props) {
  const { id, name } = props.project

  return <li>{name} - {id}</li>
}

const { shape, string } = React.PropTypes

Card.propTypes = {
  project: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
}
