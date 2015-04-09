'use strict';

var path = require('path');
var fs = require('fs');
var env = require('node-env-file');

if (fs.existsSync(path.join(__dirname, '../.env'))) {
  env(path.join(__dirname, '../.env'));
}

module.exports = {
  getVal: getVal
};

function getVal(name, defaultVal) {
  if (process.env.hasOwnProperty(name)) {
    return process.env[name].trim();
  }
  else if (defaultVal) {
    return defaultVal;
  }
  else {
    return null;
  }
}
