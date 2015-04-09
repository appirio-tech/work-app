var envConfig = require('./config');

// To access environment variables use config.getVal('name', 'default value')

module.exports = function () {
  var client = './src/client/';
  var server = './src/server/';
  var clientApp = client + 'app/';
  var report = './report/';
  var root = './';
  var specRunnerFile = 'specs.html';
  var temp = './.tmp/';
  var wiredep = require('wiredep');
  var bowerFiles = wiredep({devDependencies: true})['js'];
  var scssBuild = './.scss';
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };
  var nodeModules = 'node_modules';

  var config = {
    // angular contants
    ngConstants: {
      apiUrl: envConfig.getVal('BASE_API_URL', '/v3/'),
      auth0ClientId: envConfig.getVal('AUTH0_CLIENT_ID', ''),
      auth0Domain: envConfig.getVal('AUTH0_DOMAIN', 'topcoder-dev.auth0.com'),
      auth0retUrl: envConfig.getVal('AUTH0_RET_URL', 'http://localhost:3000/#/'),
      auth0callbackUrl: envConfig.getVal('AUTH0_CALLBACK_URL', 'http://api.topcoder-dev.com/pub/callback.html'),
      auth0TokenName: envConfig.get('AUTH0_TOKEN_NAME', 'userJWTToken')
    },
    baseURL: envConfig.getVal('BASE_URL', '/'),
    // Env Path
    env: envConfig.getVal('NODE_ENV', 'dev'),
    /**
     * File paths
     */
    // all javascript that we want to vet
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    build: './build/',
    client: client,
    css: temp + '**/*.css',
    fonts: [
      bower.directory + 'font-awesome/fonts/**/*.*',
      clientApp + '**/fonts/*'
    ],
    html: client + '**/*.html',
    jade: clientApp + '**/*.jade',
    htmltemplates: [
      clientApp + '**/*.html',
      temp + '**/*.html',
      '!' + temp + '/index.html'
    ],
    images: client + '**/images/**/*.*',
    index: temp + 'index.html',
    // app js, with no specs
    js: [
      client + 'nostubs/**/*.js',
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js'
    ],
    jsOrder: [
      '**/*stub.js',
      '**/app.module.js',
      '**/*.module.js',
      '**/*.js'
    ],

    scss: clientApp + '**/*.scss',
    scssBuild: scssBuild,
    // replace used because compass expects file paths without './'
    compass: {
      css: temp.replace('./', ''),
      sass: 'src/client/app'
    },
    report: report,
    root: root,
    server: server,
    source: 'src/',
    stubsjs: [
      bower.directory + 'angular-mocks/angular-mocks.js',
      client + 'stubs/**/*.js'
    ],
    temp: temp,

    /**
     * optimized files
     */
    optimized: {
      app: 'app.js',
      lib: 'lib.js'
    },

    /**
     * plato
     */
    plato: {js: clientApp + '**/*.js'},

    /**
     * browser sync
     */
    browserReloadDelay: 1000,

    /**
     * template cache
     */
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'app.core',
        standAlone: false
      }
    },

    /**
     * Bower and NPM files
     */
    bower: bower,
    packages: [
      './package.json',
      './bower.json'
    ],

    /**
     * specs.html, our HTML spec runner
     */
    specRunner: client + specRunnerFile,
    specRunnerFile: specRunnerFile,

    /**
     * The sequence of the injections into specs.html:
     *  1 testlibraries
     *      mocha setup
     *  2 bower
     *  3 js
     *  4 spechelpers
     *  5 specs
     *  6 templates
     */
    testlibraries: [
      nodeModules + '/mocha/mocha.js',
      nodeModules + '/chai/chai.js',
      nodeModules + '/mocha-clean/index.js',
      nodeModules + '/sinon-chai/lib/sinon-chai.js'
    ],
    specHelpers: [client + 'test-helpers/*.js', clientApp + '**/*.stubs.js'],
    specs: [clientApp + '**/*.spec.js'],

    /**
     * Node settings
     */
    nodeServer: './src/server/app.js',
    defaultPort: '8001',

    /**
     * AWS settings
     */
    aws: {
      bucket: envConfig.getVal('AWS_BUCKET', ''),
      key: envConfig.getVal('AWS_KEY', ''),
      region: envConfig.getVal('AWS_REGION', ''),
      secret: envConfig.getVal('AWS_SECRET', ''),
      cdnUrl: envConfig.getVal('AWS_CDN_URL', '')
    }
  };

  /**
   * wiredep and bower settings
   */
  config.getWiredepDefaultOptions = function () {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  /**
   * karma settings
   */
  config.karma = getKarmaOptions();

  return config;

  ////////////////

  function getKarmaOptions() {
    var options = {
      files: [].concat(
        bowerFiles,
        config.specHelpers,
        clientApp + '**/*.module.js',
        clientApp + '**/*.js',
        temp + '**/*.js',
        temp + config.templateCache.file
      ),
      exclude: [],
      coverage: {
        dir: report + 'coverage',
        reporters: [
          // reporters not supporting the `file` property
          {type: 'html', subdir: 'report-html'},
          {type: 'lcov', subdir: 'report-lcov'},
          {type: 'text-summary'}, //, subdir: '.', file: 'text-summary.txt'}
          {type: 'cobertura', subdir: 'cobertura', file: 'cobertura.xml'}
        ]
      },
      preprocessors: {}
    };
    options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
    return options;
  }
};
