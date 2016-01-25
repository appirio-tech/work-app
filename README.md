# ap-work-client
[![GitHub version](https://badge.fury.io/gh/appirio-tech%2Fwork-app.svg)](http://badge.fury.io/gh/appirio-tech%2Fwork-app)

[![Build Status](https://travis-ci.org/appirio-tech/work-app.svg?branch=dev)](https://travis-ci.org/appirio-tech/work-app)

[![Coverage Status](https://coveralls.io/repos/appirio-tech/ap-work-client/badge.svg?branch=dev&t=s1nAzI)](https://coveralls.io/r/appirio-tech/ap-work-client?branch=dev)

[![Dependency Status](https://www.versioneye.com/user/projects/55d4acfb265ff60022000e13/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55d4acfb265ff60022000e13)

## setup work space
Run the following commands to create a work space in your home directory.  The commands will clone repos that are important for this app.  There are also commands that will create sym links to ease development between multiple repos.

```shell
mkdir ~/tc-workspace
cd ~/tc-workspace/

git clone https://github.com/appirio-tech/styles.git
git clone https://github.com/appirio-tech/webpack-config.git
git clone https://github.com/appirio-tech/work-app.git
git clone https://github.com/appirio-tech/ng-work-layout.git
git clone https://github.com/appirio-tech/ng-file-upload.git
git clone https://github.com/appirio-tech/ng-timeline.git
git clone https://github.com/appirio-tech/ng-auth.git
git clone https://github.com/appirio-tech/ng-ui-components.git
git clone https://github.com/appirio-tech/ng-messaging.git
git clone https://github.com/appirio-tech/ng-login-reg.git
git clone https://github.com/appirio-tech/ng-projects.git
git clone https://github.com/appirio-tech/ng-submit-work.git
git clone https://github.com/appirio-tech/ng-api-services.git
git clone https://github.com/appirio-tech/ng-optimist.git
git clone https://github.com/appirio-tech/ng-submissions.git
git clone https://github.com/appirio-tech/ng-status-report.git
git clone https://github.com/appirio-tech/ng-manage-steps.git

cd ~/tc-workspace/work-app
npm install
npm run dev
```

## sym link to work with multiple repos
First go into the folder where the node modules are installed, then run any of the following commands

```shell
mv node_modules/appirio-tech-api-schemas/swagger node_modules/appirio-tech-api-schemas/swagger-backup
ln -s ~/tc-workspace/api-schemas/swagger/ ./node_modules/appirio-tech-api-schemas/swagger

mv node_modules/appirio-tech-api-schemas/apiary node_modules/appirio-tech-api-schemas/apiary-backup
ln -s ~/tc-workspace/api-schemas/apiary/ ./node_modules/appirio-tech-api-schemas/apiary

mv node_modules/appirio-tech-api-schemas/main.coffee node_modules/appirio-tech-api-schemas/main.coffee-backup
ln -s ~/tc-workspace/api-schemas/main.coffee ./node_modules/appirio-tech-api-schemas/main.coffee


mv node_modules/appirio-tech-client-app-layer/src node_modules/appirio-tech-client-app-layer/backup
ln -s ~/tc-workspace/client-app-layer/src/ ./node_modules/appirio-tech-client-app-layer/src
```

## Build
checkout the .travis.yml file


