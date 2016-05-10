import './StatusSelect.scss'

import map from 'lodash/map'
import React from 'react'
import { connect } from 'react-redux'
import { setProjectSeachFilters, loadProjectSearch } from '../store/actions/projectSearch.js'
import Select from 'react-select'
import ReactSelectOption from 'react-select/src/Option.js'
import classNames from 'classNames'

function ValueRenderer({ value }) {
  return value.substr(0, 3)
}

// Hack Alert: We are overriding the render method of this component
// This class is not a documented interface for the react-select library
// If the select is breaking, probably check here first
class Option extends ReactSelectOption {
  onRemove(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onRemove(this.props.option)
  }

  render() {
    const { option, isSelected } = this.props
    const className = classNames(this.props.className, option.className)
    
    const props = {
      className
    }
    
    if (option.disabled) {
      Object.assign(props, {
        onMouseDown: this.blockEvent,
        onClick: this.blockEvent
      })
    } else if (isSelected) {
      Object.assign(props, {
        onMouseDown: this.onRemove.bind(this)
      })
    } else {
      Object.assign(props, {
        style: option.style,
        onMouseDown: this.handleMouseDown,
        onMouseEnter: this.handleMouseEnter,
        onMouseMove: this.handleMouseMove,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        title: option.title
      })
    }

    return (
      <div {...props}>
        <input type="checkbox" checked={!!isSelected} />
        {this.props.children}
      </div>
    )
  }
}

class StatusSelect extends React.Component {
  handleChange(selected) {
    const { setProjectSeachFilters, loadProjectSearch } = this.props

    const status = map(selected, (item) => {
      return item.value
    })

    setProjectSeachFilters({ status })
    loadProjectSearch()
  }

  render() {
    const { status } = this.props
    const handleChange = this.handleChange.bind(this)

    const options = {
      name: 'status',
      multi: true,
      value: status,
      searchable: false,
      options: [
        { value: 'INCOMPLETE', label: 'INCOMPLETE' },
        { value: 'SUBMITTED', label: 'SUBMITTED' },
        { value: 'ASSIGNED', label: 'ASSIGNED' },
        { value: 'ESTIMATE', label: 'ESTIMATE' },
        { value: 'APPROVED', label: 'APPROVED' },
        { value: 'LAUNCHED', label: 'LAUNCHED' },
        { value: 'COMPLETED', label: 'COMPLETED' }
      ],
      onChange: handleChange,
      placeholder: 'Project Status...',
      valueRenderer: ValueRenderer,
      filterOptions: false,
      optionComponent: Option
    }

    return (
      <div>
        <Select {...options} />
      </div>
    )
  }
}

const { arrayOf, string, func } = React.PropTypes

StatusSelect.propTypes = {
  status: arrayOf(string).isRequired,
  setProjectSeachFilters: func.isRequired,
  loadProjectSearch: func.isRequired
}

function mapStateToProps(state) {
  return {
    status: state.projectSearch.filters.status
  }
}

const actionsToBind = {
  setProjectSeachFilters,
  loadProjectSearch
}

export default connect(mapStateToProps, actionsToBind)(StatusSelect)