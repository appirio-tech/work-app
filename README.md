# Topcoder Connect

[![GitHub version](https://badge.fury.io/gh/appirio-tech%2Fwork-app.svg)](http://badge.fury.io/gh/appirio-tech%2Fwork-app)
[![Build Status](https://travis-ci.org/appirio-tech/work-app.svg?branch=dev)](https://travis-ci.org/appirio-tech/work-app)
[![Dependency Status](https://www.versioneye.com/user/projects/5727ab42a0ca35004baf7538/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5727ab42a0ca35004baf7538)

## What is this?

The primary app repo for [Topcoder Connect](https://connect.topcoder.com).

### Getting Started

- Ensure that you have an alias for ``local.topcoder-dev.com`` to ``127.0.0.1`` in your hosts file
- ``npm install``
- ``npm run dev``
- Open ``local.topcoder-dev.com:8080`` in your browser.

### Requirements

This app has been developed using ``Node > 5.0.0`` and ``NPM > 3.0.0``, all other requirements will be installed by ``NPM``. We recommend using at least those versions.

### Stack

- [Webpack](https://github.com/webpack/webpack) - Build tool, bundler, dev server, all around great guy.
- Javascript / ES6 - We are using [Babel](https://babeljs.io/) (via Webpack) to transpile ES6 code to fully browser compatible ES5 code.
- [React](https://facebook.github.io/react/) - View layer.
- [Redux](https://github.com/reactjs/redux) - Model layer.
- [UI Router](https://github.com/angular-ui/ui-router) - Router. Probably sticking around until we can fully deprecate Angular.

**Deprecated**

- [Angular](https://angularjs.org) - Our legacy view layer. Deprecated in favor of React.
- Coffeescript - Mostly used in our Angular code. Served us well, but has been phased out in favor of ES6.

### Internal dependencies

- [Webpack Config](https://github.com/appirio-tech/webpack-config) - Standard build config for all Topcoder apps. Includes constants common to all apps.
- [UI Components](https://github.com/appirio-tech/ng-ui-components) - Shared library of Angular components used across Topcoder apps. **Has been deprecated in favor of TC-UI**.
- [Appirio Styles](https://github.com/appirio-tech/styles) - CSS companion to UI Components. **Also deprecated**.
- [TC-UI](https://github.com/appirio-tech/tc-ui) - Topcoder UI Kit. Used for SASS exports (vars, mixins) and React components.
- [Accounts](https://github.com/appirio-tech/accounts-app) - We import a small library from here that handles token fetching/refreshing. Additionally, all login/registration/password/account/auth UI is hosted from this app at [https://accounts.topcoder.com](accounts.topcoder.com)





