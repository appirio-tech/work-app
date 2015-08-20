AutoConfigFakeServer.init()

AutoConfigFakeServer.fakeServer.autoRespond = true

schemas = [
  FIXTURES['bower_components/appirio-tech-api-schemas/apiary/submissiondraft.json']
];

AutoConfigFakeServer.consume(schemas)