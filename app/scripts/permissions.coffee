module.exports = (user) ->
  permissions = []

  unless user
    return permissions

  permissions.push 'READ'

  if user.role == 'customer' || user.role == 'copilot'
    permissions.push 'UPDATE'
    permissions.push 'CREATE'

  permissions