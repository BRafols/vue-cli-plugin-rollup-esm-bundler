// Inspired from https://github.com/team-innovation/vue-sfc-rollup

// Import vue component
import component from '../components/<%- componentNamePascal %>.vue'

// install function executed by Vue.use()
export function install(Vue, { store }) {

  if (!store) {
    throw new Exception('Please provide a store')
  }

  if (install.installed) return
  install.installed = true
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
