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
git clone https://github.com/appirio-tech/gulp-tasks.git
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
bower install

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-work-layout/dist
ln -s ~/tc-workspace/ng-work-layout/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-work-layout/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-file-upload/dist
ln -s ~/tc-workspace/ng-file-upload/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-file-upload/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-timeline/dist
ln -s ~/tc-workspace/ng-timeline/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-timeline/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-auth/dist
ln -s ~/tc-workspace/ng-auth/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-auth
/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-ui-components/dist
ln -s ~/tc-workspace/ng-ui-components/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-ui-components/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-messaging/dist
ln -s ~/tc-workspace/ng-messaging/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-messaging/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-login-reg/dist
ln -s ~/tc-workspace/ng-login-reg/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-login-reg/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-projects/dist
ln -s ~/tc-workspace/ng-projects/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-projects/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-submit-work/dist
ln -s ~/tc-workspace/ng-submit-work/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-submit-work/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-api-services/dist
ln -s ~/tc-workspace/ng-api-services/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-api-services/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-optimist/dist
ln -s ~/tc-workspace/ng-optimist/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-optimist/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-submissions/dist
ln -s ~/tc-workspace/ng-submissions/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-submissions/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-status-report/dist
ln -s ~/tc-workspace/ng-status-report/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-status-report/dist

rm -rf ~/tc-workspace/work-app/bower_components/appirio-tech-ng-manage-steps/dist
ln -s ~/tc-workspace/ng-manage-steps/dist ~/tc-workspace/work-app/bower_components/appirio-tech-ng-manage-steps/dist

gulp serve
```

## Build
checkout the .travis.yml file

## Gulp tasks
checkout https://github.com/appirio-tech/gulp-tasks.git

