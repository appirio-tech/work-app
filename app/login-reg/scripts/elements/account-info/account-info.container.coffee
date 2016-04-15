'use strict'

{ PropTypes, createElement } = require 'react'
{ reduxForm } = require 'redux-form'
AccountInfo = require './account-info.element'
{ updatePassword } = require 'appirio-tech-client-app-layer'

fields = [
  'currentPassword'
  'password'
]

submit = (values, dispatch) ->
  dispatch updatePassword(values)

  Promise.resolve {}

Container = (props) ->
  createElement AccountInfo,
    fields: props.fields
    submitting: props.submitting
    handleSubmit: props.handleSubmit(submit)

Container.propTypes =
  fields: PropTypes.object.isRequired
  handleSubmit: PropTypes.func.isRequired
  submitting: PropTypes.bool.isRequired

formProps =
  form: 'accountInfo'
  fields: fields

module.exports = reduxForm(formProps)(Container)