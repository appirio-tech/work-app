module.exports = (role) ->
  permissions = []

  unless role
    return permissions

  permissions.push 'READ'

  if role == 'customer' || role == 'copilot'
    permissions.push 'UPDATE'
    permissions.push 'CREATE'

  permissions