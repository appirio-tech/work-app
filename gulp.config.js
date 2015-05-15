var envConfig = require('./config');

// To access environment variables use config.getVal('name', 'default value')

module.exports = function () {
  var client         = './src/client/';
  var server         = './src/server/';
  var clientApp      = client + 'app/';
  var report         = './report/';
  var root           = './';
  var specRunnerFile = 'specs.html';
  var temp           = './.tmp/';
  var wiredep        = require('wiredep');
  var bowerFiles     = wiredep({devDependencies: true})['js'];
  var scssBuild      = './.scss';
  var coffeeBuild    = './.coffee';
  var nodeModules    = 'node_modules';

  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };

  var config = {
    // angular contants
    ngConstants: {
      apiUrl: envConfig.getVal('BASE_API_URL', '/v3/'),
      auth0ClientId: envConfig.getVal('AUTH0_CLIENT_ID', ''),
      auth0Domain: envConfig.getVal('AUTH0_DOMAIN', 'topcoder-dev.auth0.com'),
      auth0TokenName: envConfig.getVal('AUTH0_TOKEN_NAME', 'userJWTToken')
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
    jade: clientApp + '**/!(index)+(.jade)',
    jadeIndex: clientApp + '**/index.jade',
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
    coffee: clientApp + '**/*.coffee',
    scssBuild: scssBuild,
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
        './bower_components/auto-config-fake-server/dist/auto-config-fake-server.js',
        config.specHelpers,
        client    + 'mock-api/*.coffee',
        client    + 'test-helpers/*.coffee',
        clientApp + '**/*.module.{js,coffee}',
        clientApp + '**/*.{js,coffee}',
        temp + 'constants.js',
        temp + 'templates.js',
        {
          pattern: './bower_components/work-api-schema/*.json'
        }
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

    options.preprocessors['**/*.coffee'] =  ['coffee'];

    options.preprocessors['**/*.json'] =  ['json_fixtures'];

    return options;
  }
};
