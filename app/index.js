const scripts    = document.getElementsByTagName('script');
const src        = scripts[scripts.length - 1].getAttribute('src');
const publicPath = src.substr(0, src.lastIndexOf('/') + 1);

__webpack_public_path__ = publicPath

require('zepto/zepto')
require('angular')
require('angular-ui-router')

require('./app.module')
require('./app-config')
require('./app-run')

require('appirio-tech-ng-api-services')
require('appirio-tech-ng-auth')
require('appirio-tech-ng-login-reg')
require('appirio-tech-ng-messaging')
require('appirio-tech-ng-projects')
require('appirio-tech-ng-status-report')
require('appirio-tech-ng-submissions')
require('appirio-tech-ng-submit-work')
require('appirio-tech-ng-timeline')
require('appirio-tech-ng-work-layout')

require('./scripts/messaging.controller')
require('./scripts/timeline.controller')
require('./scripts/submissions-pages.controller')
require('./scripts/submit-work-page.controller')
require('./scripts/403.controller')
require('./scripts/customer/customer-projects.controller')
require('./scripts/customer/project-details.controller')
require('./scripts/copilot/copilot-projects.controller')
require('./scripts/copilot/copilot-project-details.controller')
require('./scripts/copilot/open-projects.controller')
require('./scripts/copilot/status-reports.controller')
require('./scripts/copilot/status-report-details.controller')
require('./scripts/login-reg/sso-callback.controller')
require('./scripts/login-reg/sso-login.controller')

require('./styles/main')
require('./styles/manage')
require('./styles/messaging')
require('./styles/copilot')
require('./styles/404')
require('./styles/submissions')
require('./styles/submit-work')