const chalk = require('chalk')
const emoji = require('node-emoji')
module.exports = (api, options, rootOptions) => {
  console.log(`\n${emoji.get('pizza')}  Thank you for using ${chalk.cyan('Rollup ESM Bundler Plugin')}`)
  console.log(`    For questions, issues and recommendations please visit: `)
  console.log(`    ${chalk.green('https://github.com/ti-pa-to/vue-cli-plugin-rollup-lib-bundler')}`)

  api.extendPackage({
    scripts: {
      rollup: 'npm run rollup:unpkg & npm run rollup:es & npm run rollup:umd',
      'rollup:umd': 'rollup --config src/rollup/rollup.config.js --format umd --file dist/rollup-XXX.umd.js',
      'rollup:es': 'rollup --config src/rollup/rollup.config.js --format es --file dist/rollup-XXX.esm.js',
      'rollup:unpkg': 'rollup --config src/rollup/rollup.config.js --format iife --file dist/rollup-XXX.min.js'
    }
  })

  // Install Rollup and supporting packages
  api.extendPackage({
    devDependencies: {
      rollup: '*',
      'rollup-plugin-buble': '*',
      'rollup-plugin-uglify-es': '*',
      'rollup-plugin-vue': '*'
    }
  })

  // Render template
  api.render('./template')
}
