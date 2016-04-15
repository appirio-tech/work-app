'use strict'

React = require 'react'
{ PropTypes, createElement } = React
{ reduxForm } = require 'redux-form'
PersonalInfoElement = require './personal-info.element'
{ loadProfile } = require 'appirio-tech-client-app-layer'

fields = [
  'firstName'
  'lastName'
  'organization'
]

PersonalInfo = React.createClass
  propTypes:
    fields: PropTypes.object.isRequired
    handleSubmit: PropTypes.func.isRequired
    submitting: PropTypes.bool.isRequired

  componentWillMount: ->
    { loadProfile, userId } = this.props

    loadProfile userId

  submit: (values, dispatch) ->
    this.props.dispatch updateProfile(values)
    Promise.resolve(null)

  render: ->
    createElement PersonalInfoElement,
      fields: this.props.fields
      submitting: this.props.submitting
      handleSubmit: this.props.handleSubmit(this.submit)

mapStateToProps = (state) ->
  userId = state.user.id

  userId: userId
  initialValues: state.entities.profiles[userId]

formProps =
  form: 'personalInfo'
  fields: fields

actionsToBind = {
  loadProfile
}

module.exports = reduxForm(formProps, mapStateToProps, actionsToBind)(PersonalInfo)
