import Provider from 'appirio-tech-ng-ui-components/components/Provider/Provider'
import Controls from './Controls.jsx'

const directive = (reactDirective) => reactDirective(Provider(Controls))

directive.$inject = ['reactDirective']

angular.module('app').directive('projectSearchControls', directive)