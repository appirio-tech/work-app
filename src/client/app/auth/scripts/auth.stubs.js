/*jshint maxlen:120 */
/*jshint -W079 */
var mockAuthRequest = (function () {
  return {
    getAuth: getAuth,
    signin: signin,
    login: login
  };

  function signin(options, successCallback, errorCallback, libName) {
    successCallback('profileReturn', 'idToken', 'accessToken', 'state', 'refreshToken');
  }

  function getAuth() {
    return {
      id: '28b7c14a:14d2e5ec0d9:-7f94',
      result: {
        success: true,
        status: 200,
        metadata: null,
        content: {
          id: '1793556748',
          modifiedBy: null,
          modifiedAt: null,
          createdBy: null,
          createdAt: null,
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS50b3Bjb2Rlci1kZXYuY29tIiwiZXhwIjoxNDMxMDI2MDU5LCJ1c2VySWQiOiI0MDEzNTM5MiIsImlhdCI6MTQzMTAyNTQ1OSwianRpIjoiMTRmZmZkNzctZmI5NS00OGYzLWIzMjItOTk3ZjAxOWZjZTVjIn0.rGt25g0NMEthuLPXjYQujibc6wsI6PrVsS_hkHBslzg',
          target: '1'
        }
      },
      version: 'v3'
    };
  }

  function login(optons) {
    if (optons.username === '1234' && optons.password === '1234') {

      var auth = getAuth();

      localStorage.setItem('userJWTToken', auth.result.content.token);

      optons.success();
    } else {
      localStorage.removeItem('userJWTToken');
      optons.error();
    }
  }
})();
