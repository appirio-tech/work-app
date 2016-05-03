require('babel-core/register')({
  // Ignore everything in node_modules except node_modules/rcomponents.
  ignore: /node_modules\/(?!tc-accounts)/,
  presets: ['es2015', 'react', 'stage-2']
})

const accounts = require('tc-accounts')
const constants = require('./app/constants.js')

accounts.configureConnector({
  connectorUrl: constants.CONNECTOR_URL,
  frameId: 'tc-accounts-iframe',
  mockMode: true,
  mockToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJUb3Bjb2RlciBVc2VyIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJhbmRyZXdjdXN0b21lciIsImV4cCI6MTQ2MjMwMDkwNCwidXNlcklkIjoiNDAxNDEzMzYiLCJpYXQiOjE0NjIzMDAzMDQsImVtYWlsIjoiYXNlbGJpZStjdXN0b21lckBnbWFpbC5jb20iLCJqdGkiOiI3YjE3MDk4Yi04ZDIzLTQxYjYtYjUzOS02Njc5ZjIwOWYzMGUifQ.eZ3AtK_qkQ1RxqDC7zUHGpWsLcytBLd-HjV56wI-Lr4'
})