/*jshint maxlen:120 */
/*jshint -W079 */
var mockUser = (function () {
  return {
    getMockUserRequests: getMockUserRequests,
    getMockUserRequest: getMockUserRequest,
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

  function getMockUserRequest() {
    return {
      id:'40135392',
      modifiedBy: null,
      modifiedAt: null,
      createdBy: null,
      createdAt: null,
      handle: '_indy2',
      email: 'nhastings@appirio.com',
      firstName: 'Neil',
      lastName: 'Hastings',
      credential: null,
      status: 'U',
      active: false
    };
  }

  function getMockUserRequests() {
    return [
      {
        id:'40135392',
        modifiedBy: null,
        modifiedAt: null,
        createdBy: null,
        createdAt: null,
        handle: '_indy2',
        email: 'nhastings@appirio.com',
        firstName: 'Neil',
        lastName: 'Hastings',
        credential: null,
        status: 'U',
        active: false
      }
    ];
  }
})();
