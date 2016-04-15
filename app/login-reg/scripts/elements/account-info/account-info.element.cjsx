'use strict'

React = require 'react'
{ PropTypes, Component } = React

AccountInfo = ({ 
  fields: { currentPassword, password }
  handleSubmit
  submitting
}) ->
  <div>
    <header>
      <div className="flex middle">
        <h4>account info</h4>
        {# <p>Username and email are not editable.</p> }
      </div>
      <hr/>
    </header>

    <main>
      {# <h6>username</h6> }
      {# <p>state.username</p> }
      {# <h6 className="email-address">email address</h6> }
      {# <p>state.email</p> }
      {# <hr/> }
      <form onSubmit={handleSubmit}>
        <h6>password</h6>

        <p>Current Password</p>
        <input type="password" placeholder="Enter Password" {...currentPassword} />

        <p>New Password</p>
        <input type="password" placeholder="Enter Password" {...password} />

        <button className="action">save</button>
      </form>
    </main>
  </div>

AccountInfo.propTypes =
  fields: PropTypes.object.isRequired
  handleSubmit: PropTypes.func.isRequired
  submitting: PropTypes.bool.isRequired

module.exports = AccountInfo














