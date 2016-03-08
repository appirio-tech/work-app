import { createElement, Component, PropTypes } from 'react'

import CardView from './CardView.jsx'

export default class Card extends Component {
  render() {
    return createElement(CardView)
  }
}

Card.propTypes = {}

