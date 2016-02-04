module.exports = (user) ->
  permissions = []

  unless user
    return permissions

  if user.role == 'customer' || user.role == 'copilot'
    permissions.push 'UPDATE'

  permissions