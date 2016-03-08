import { createElement, Component, PropTypes } from 'react'
import ListView from './ListView.jsx'

export default class List extends Component {
  render() {
    return createElement(ListView)
  }
}

List.propTypes = {}
