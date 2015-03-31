/*jshint maxlen:120 */
/*jshint -W079 */
var mockWorkRequest = (function() {
  return {
    getMockWorkRequests: getMockWorkRequests,
    getMockWorkRequest: getMockWorkRequest
  };

  function getMockWorkRequest() {
    return {
      "version" : 0,
      "id" : "testid",
      "modifiedBy" : "testuser",
      "modifiedAt" : 1427392397388,
      "createdBy" : "testuser",
      "createdAt" : 1427392397388,
      "name" : "testname",
      "summary" : "test summary\ntesting",
      "requestType" : "Design & Code",
      "ownerId" : "testuser",
      "competitorApps" : [ "comp 1", "comp 2", "comp 3" ],
      "usageDescription" : "usage",
      "features" : [ {
        "name" : "feature1",
        "description" : "desc1"
      }, {
        "name" : "feature2",
        "description" : "desc2"
      } ]
    }
  }

  function getMockWorkRequests() {
    return [
      {
        "version" : 0,
        "id" : "testid",
        "modifiedBy" : "testuser",
        "modifiedAt" : 1427392397388,
        "createdBy" : "testuser",
        "createdAt" : 1427392397388,
        "name" : "testname",
        "summary" : "test summary\ntesting",
        "requestType" : "Design & Code",
        "ownerId" : "testuser",
        "competitorApps" : [ "comp 1", "comp 2", "comp 3" ],
        "usageDescription" : "usage",
        "features" : [ {
          "name" : "feature1",
          "description" : "desc1"
        }, {
          "name" : "feature2",
          "description" : "desc2"
        } ]
      }
    ];
  }
})();
