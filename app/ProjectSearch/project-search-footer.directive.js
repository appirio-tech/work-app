import Provider from 'appirio-tech-ng-ui-components/components/Provider/Provider'
import Footer from './Footer.jsx'

const directive = (reactDirective) => reactDirective(Provider(Footer))

directive.$inject = ['reactDirective']

angular.module('app').directive('projectSearchFooter', directive)
