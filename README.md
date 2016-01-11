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

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-work-layout/src
ln -s ~/tc-workspace/ng-work-layout/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-work-layout/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-file-upload/src
ln -s ~/tc-workspace/ng-file-upload/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-file-upload/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-timeline/src
ln -s ~/tc-workspace/ng-timeline/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-timeline/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-auth/src
ln -s ~/tc-workspace/ng-auth/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-auth
/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-ui-components/src
ln -s ~/tc-workspace/ng-ui-components/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-ui-components/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-messaging/src
ln -s ~/tc-workspace/ng-messaging/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-messaging/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-login-reg/src
ln -s ~/tc-workspace/ng-login-reg/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-login-reg/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-projects/src
ln -s ~/tc-workspace/ng-projects/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-projects/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-submit-work/src
ln -s ~/tc-workspace/ng-submit-work/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-submit-work/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-api-services/src
ln -s ~/tc-workspace/ng-api-services/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-api-services/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-optimist/src
ln -s ~/tc-workspace/ng-optimist/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-optimist/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-submissions/src
ln -s ~/tc-workspace/ng-submissions/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-submissions/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-status-report/src
ln -s ~/tc-workspace/ng-status-report/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-status-report/src

rm -rf ~/tc-workspace/work-app/node_modules/appirio-tech-ng-manage-steps/src
ln -s ~/tc-workspace/ng-manage-steps/src ~/tc-workspace/work-app/node_modules/appirio-tech-ng-manage-steps/src

npm run dev
```

## Build
checkout the .travis.yml file


