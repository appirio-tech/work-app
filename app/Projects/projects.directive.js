import Provider from 'appirio-tech-ng-ui-components/components/Provider/Provider'
import Projects from './Projects.js'

const directive = (reactDirective) => reactDirective(Provider(Projects))

directive.$inject = ['reactDirective']

angular.module('appirio-tech-ng-login-reg').directive('projects', directive)
