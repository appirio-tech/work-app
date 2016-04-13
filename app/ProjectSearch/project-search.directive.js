import Provider from 'appirio-tech-ng-ui-components/components/Provider/Provider'
import ProjectSearch from './ProjectSearch.jsx'

const directive = (reactDirective) => reactDirective(Provider(ProjectSearch))

directive.$inject = ['reactDirective']

angular.module('appirio-tech-ng-login-reg').directive('projectSearch', directive)
