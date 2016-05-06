import map from 'lodash/map'
import React from 'react'
import { connect } from 'react-redux'
import { setProjectSeachFilters, loadProjectSearch } from '../store/actions/projectSearch.js'
import Select from 'react-select'

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
      value: status.join(','),
      delimiter: ',',
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
      placeholder: 'Project Status...'
    }

    return (
      <Select {...options} />
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