# ap-work-client

[![Build Status](https://magnum.travis-ci.com/appirio-tech/ap-work-client.svg?token=2opeegVgyrFpxakAa2Cb&branch=travis-ci)](https://magnum.travis-ci.com/appirio-tech/ap-work-client) [![Coverage Status](https://coveralls.io/repos/appirio-tech/ap-work-client/badge.svg?branch=dev&t=s1nAzI)](https://coveralls.io/r/appirio-tech/ap-work-client?branch=dev)

## Build
gulp clean; gulp preprocessors; gulp useref; gulp copy-files; gulp optimize-build; gulp finger-print; gulp finger-print-replace;

# OLD DOCS

## Repo mapping
![ScreenShot](https://www.gliffy.com/go/publish/image/8283283/L.png)

**Generated from [HotTowel Angular](https://github.com/johnpapa/HotTowel-Angular)**

- This is the client side code for the new version of appXpress
-  Make sure to see our [AngularJS style guide](https://github.com/appirio-tech/angularjs-styleguide)

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

1.5. For OSX users, we recommend installing [nvm](https://github.com/creationix/nvm). This is due to problems with cross-version compatibility with node for certain packages this project uses.
 - This will allow you to use versions of node and npm that are compatible with this project without affecting what you use globally
 - In your `.nvmrc` (which should be at the root of your local version of this repo), list the version number `0.10.25`.
 - While inside the repo, run `nvm use`
 - Then run `npm install` and `bower install`.

2. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon`
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

3.  git clone git@github.com:appirio-tech/work-api-schema.git

## Gulp tasks

### Linting
 - Run code analysis using `gulp analyze`. This runs jshint, jscs, and plato.

### Tests
 - Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running in dev mode
 - Run the project with `gulp serve-dev`

### Building the project
 - Build the optimized project using `gulp build`
 - This create the optimized code for the project and puts it in the build folder

### Running the optimized code
 - Run the optimize project from the build folder with `gulp serve-build`

## Exploring HotTowel
HotTowel Angular starter project

### Structure
The structure also contains a gulpfile.js and a server folder. The server is there just so we can serve the app using node.

  /src
    /client
      /app
      /content
  

### The Modules
The app has several modules and depends on a series of external modules and custom but cross-app modules

```
app --> [
        
        app.project,
        app.getting-started,
        app.layout,
        app.widgets,
    app.core --> [
      ngAnimate,
      ngSanitize,
      ui.router,
      blocks.exception,
      blocks.logger,
      blocks.router
    ]
    ]
```

#### core Module
Core modules are ones that are shared throughout the entire application and may be customized for the specific application. Example might be common data services.

This is an aggregator of modules that the application will need. The `core` module takes the blocks, common, and Angular sub-modules as dependencies. 

#### blocks Modules
Block modules are reusable blocks of code that can be used across projects simply by including them as dependencies.

##### blocks.logger Module
The `blocks.logger` module handles logging across the Angular app.

##### blocks.exception Module
The `blocks.exception` module handles exceptions across the Angular app.

It depends on the `blocks.logger` module, because the implementation logs the exceptions.

##### blocks.router Module
The `blocks.router` module contains a routing helper module that assists in adding routes to the $routeProvider.

## Testing

### Performance Testing (TBD)

To help keep our front end as fast as possible, the following performance benchmarks will be measured.  A minimal standard has not yet been setup but when the minimal requirements are in place then the build will fail.

The testing should be done independent of the backend services using mock data.  The testing should be run against every page.  The testing should be done in a production optimized state meaning all js and css should be minimized.

#### Tests

* Time to First Render
* Time to initial javascript loaded
* Time to full page loading
* Time for each subsequent Ajax calls
* Run Google Page Speed against selected pages
* RUn WebTestSpeed API against selected pages from selected locations

### Complexity Testings

The [plato](https://github.com/es-analysis/plato) complexity report is integrated into gulp.  Standards will be created as minimum required.

### Code Coverage

Code should be sufficiently (amount to be determined) covered by tests.

# Using Environment Configuration during build.

Access environmental variables should be done via the config directory in this repository.  This allows easy overrides using a .env file.

This is mostly useful during the build process

```javascript
config = require('./config');

// To access environment variables use config.getVal('name', 'default value')
var value = config.getVal('baseURL', 'http://topcoder.com');


```

## Env variables

AWS_BUCKET=
AWS_KEY=
AWS_REGION=
AWS_SECRET=
BASE_URL=/
AWS_CDN_URL=
BASE_API_URL=
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
RET_URL=
CALLBACK_URL=
NODE_ENV=

# Jade

http://jade-lang.com/

Jade is used as the template rendering engine.  Please keep files with relevant angular modules.

## Global Variables:

baseUrl: The base url.  in prod it's /work/.  Uses BASE_URL
apiUrl: The base url for the API.  Defaults to /v3/.  Uses BASE_API_URL.
auth0ClientId: The Auth0 Client ID.  
auth0Domain: The Auth0 domain.  Defaults to topcoder-dev.auth0.com. Uses AUTH0_DOMAIN.
retUrl: The URL which the Authorization service sends the after login.  Uses RET_URL
callbackUrl: The callback url for auth0.  Defaults to http://api.topcoder-dev.com/pub/callback.html.  Uses CALLBACK_URL.

# Base API

This is a factory for creating resources. It would be used like this:

First, the individual services would register themselves with the API:

api.add('work');

// OR

api.add({
  resource: 'work',
  url: '/work'
});

// OR

api.add({
  resource: 'work',
  url: '/users/:user_id/work',
  params: {
    user_id: '@user_id'
  }
});
Then api service would be used like this in a controller:

api.work.get.$promise.then(function () {});

Original concept came from http://www.objectpartners.com/2014/06/03/extending-angulars-resource-service-for-a-consistent-api/.


# ap-work-client ProtractorJS e2e framework

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Run following commands to install protractor, protractor uisref locatator package and selenium webdriver installation.
  - npm install -g protractor
  - npm install protractor-linkuisref-locator
  - npm install jasmine-reporters@^1.0.0
  - npm install protractor-html-screenshot-reporter --save-dev
  We have to set NODE_PATH in environment variable.
  - export NODE_PATH=/usr/local/lib/node_modules/npm/node_modules
  - webdriver-manager update

3. start up a server with:
  - webdriver-manager start  

4. Open another terminal and go to location of your conf.js file and run following command:
  - protractor conf.js
  
### For more reference on protractor.js, please visit https://angular.github.io/protractor/#/tutorial

### Page Object Pattern is used for testing any particular type of action like login, create new project, manage project etc.
    There are generally 3 js files for every specific type of test case creation. Suppose you are creating test case for login funcitonality then
    1.  login.data.js - It contain data needed for testing like user name and password in json format.
    2.  login.object.js - It is created to follow Page Object Pattern to separate internal logics from main sequence of test case. 
         It contain all functions needed by particular test case like 
    	- opening browser and 
    	- navigate to particular login page url
    3. login.spec.js - It contain all sequence for particular type of test case.
    4. conf.js - It contain all configuration needed to setup for protractor js. 
       Replace baseDirectory parameter of HtmlReporter with your local project repo location for report folder.
       baseDirectory: '/Volumes/Data/gitDemand/ap-work-client/test/e2e/report'

