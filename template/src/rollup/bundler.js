// Inspired from https://github.com/team-innovation/vue-sfc-rollup

// Import vue component
import createRoutes from './../routes/index'
import { createModule } from './../store/index'
import component from '../components/<%- componentNamePascal %>.vue'

// install function executed by Vue.use()
export function install(Vue, { store , router, axios }) {
  
  /**
   * Validation
   */
  if (!store) {
    throw 'Please provide a store'
  }

  if (!router) {
    throw 'Please provide a router instance'
  }

  if (!axios) {
    throw 'Please provide a axios instance'
  }

  if (install.installed) return
  install.installed = true

  store.registerModule('module_name', createModule())
  router.addRoutes(createRoutes())
  Vue.prototype.$axios = axios
  Vue.component('<%- componentNamePascal %>', component)
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// To auto-install when vue is found
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default component

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
