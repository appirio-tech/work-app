/*jshint maxlen:120 */
/*jshint -W079 */
var mockWorkRequest = (function () {
  return {
    getMockWorkRequests: getMockWorkRequests,
    getMockWorkRequest: getMockWorkRequest,
    getResponse: getResponse
  };

  function getResponse(type) {
    var callback = 'getMock' + type;

    return {
      id: '-65f3d89e:14c71d48140:-7fae',
      version: 'v3',
      result: {
        success: true,
        status: 200,
        metadata: null,
        content: mockWorkRequest[callback]()
      }
    };
  }

  function getMockWorkRequest() {
    return {
      version: 0,
      id: 'testid',
      modifiedBy: 'testuser',
      modifiedAt: 1427392397388,
      createdBy: 'testuser',
      createdAt: 1427392397388,
      name: 'testname',
      summary: 'test summary\ntesting',
      requestType: 'Design & Code',
      ownerId: 'testuser',
      competitorApps: ['comp 1', 'comp 2', 'comp 3'],
      usageDescription: 'usage',
      features: [{
        name: 'feature1',
        description: 'desc1'
      }, {
        name: 'feature2',
        description: 'desc2'
      }]
    };
  }

  function getMockWorkRequests() {
    return [
      {
        version: 0,
        id: 'testid',
        modifiedBy: 'testuser',
        modifiedAt: 1427392397388,
        createdBy: 'testuser',
        createdAt: 1427392397388,
        name: 'testname',
        summary: 'test summary\ntesting',
        requestType: 'Design & Code',
        ownerId: 'testuser',
        competitorApps: ['comp 1', 'comp 2', 'comp 3'],
        usageDescription: 'usage',
        features: [{
          name: 'feature1',
          description: 'desc1'
        }, {
          name: 'feature2',
          description: 'desc2'
        }]
      }
    ];
  }
})();
