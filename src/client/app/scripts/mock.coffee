AutoConfigFakeServer.init()

AutoConfigFakeServer.fakeServer.autoRespond = true

schemas = [
  'bower_components/appirio-tech-api-schemas/swagger/v3-events.json'
  'bower_components/appirio-tech-api-schemas/swagger/v2.json'
  'bower_components/appirio-tech-api-schemas/swagger/v3-threads.json'
  'bower_components/appirio-tech-api-schemas/swagger/v3-messages.json'
  'bower_components/appirio-tech-api-schemas/swagger/v3-submissions.json'
]

fixtures = []

for schema in schemas
  if window.FIXTURES[schema]
    fixtures.push window.FIXTURES[schema]
  else
    msg = 'mock data for ' + schema + ' can not be found'

    console.error msg

AutoConfigFakeServer.consume fixtures
