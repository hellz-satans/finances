/**
 * Forked from https://github.com/vuejs-tips/v-money/tree/694fecf8212cde639cd4d4de680c1c20fc04a477
 *
 * As of that commit, a license was not specified
 */
import Money from './component.vue'
import VMoney from './directive'
import options from './options'
const VERSION = '0.0.1'

export {
  Money,
  VMoney,
  options,
  VERSION
}

function install (Vue, globalOptions) {
  if (globalOptions) {
    Object.keys(globalOptions).map(function(key){
      options[key] = globalOptions[key]
    })
  }
  Vue.directive('money', VMoney)
  Vue.component('money', Money)
}

export default install

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
