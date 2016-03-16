import { createElement, Component, PropTypes } from 'react'
import ControlsView from './ControlsView.jsx'

export default class Controls extends Component {
  render() {
    return createElement(ControlsView)
  }
}

Controls.propTypes = {}
