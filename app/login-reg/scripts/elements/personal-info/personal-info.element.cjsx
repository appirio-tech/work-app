'use strict'

React = require 'react'
{ PropTypes, Component } = React

PersonalInfo = ({ 
  fields: { firstName, lastName, organization }
  handleSubmit
  submitting
}) ->
  <div>
    <header>
      <h4>my info</h4>
      <hr />
    </header>

    <main>
      <form onSubmit={handleSubmit}>
        <h6>name</h6>

        <div className="flex">
          <div>
            <label>First Name</label>
            <input type="text" placeholder="Enter Name" {...firstName}/>
            {firstName.touched && firstName.error && <div>{firstName.error}</div>}
          </div>

          <div>
            <label>Last Name</label>
            <input type="text" placeholder="Enter Name" {...lastName}/>
          </div>
        </div>

        <label>Organization</label>
        <input type="text" placeholder="Enter Organization" {...organization}/>

        <button disabled={submitting}>
          Submit
        </button>

      </form>
    </main>
  </div>

PersonalInfo.propTypes =
  fields: PropTypes.object.isRequired
  handleSubmit: PropTypes.func.isRequired
  submitting: PropTypes.bool.isRequired

module.exports = PersonalInfo
