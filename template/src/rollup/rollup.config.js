// Inspired from https://github.com/team-innovation/vue-sfc-rollup

import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify-es'

const config = {
  input: 'src/rollup/bundler.js',
  output: {
    name: '<%- componentNamePascal %>',
    exports: 'named'
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true
    }),
    buble()
  ]
}

if (process.argv.indexOf('iife') !== -1) {
  config.plugins.push(uglify())
}

export default config
