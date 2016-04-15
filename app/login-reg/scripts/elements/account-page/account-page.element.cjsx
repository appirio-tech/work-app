'use strict'

React        = require 'react'
AccountInfo  = require '../account-info/account-info.container'
PersonalInfo = require '../personal-info/personal-info.container'

AccountPageElement = ->
  <div className="flex">
    <aside>
      <ul>
        <li><button className="clean">account info</button></li>
        {# <li><button className="clean">personal info</button></li> }
      </ul>
    </aside>

    <main className="flex-grow">
      <account-info>
        <AccountInfo />
      </account-info>

      {# <personal-info> }
      {#   <PersonalInfo /> }
      {# </personal-info> }
    </main>
  </div>

module.exports = AccountPageElement
