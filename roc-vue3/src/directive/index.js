import hasRole from './permission/hasRole'
import hasPermit from './permission/hasPermit'
import copyText from './common/copyText'

export default function directive(app) {
  app.directive('hasRole', hasRole)
  app.directive('hasPermit', hasPermit)
  app.directive('copyText', copyText)
}
