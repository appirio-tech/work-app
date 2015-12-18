// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

require('angular');
require('angular-mocks/angular-mocks');
require('sinon');

var testsContext = require.context(".", true, /.spec$/);
testsContext.keys().forEach(testsContext);