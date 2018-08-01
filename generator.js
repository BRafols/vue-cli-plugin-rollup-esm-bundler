const chalk = require('chalk')
const emoji = require('node-emoji')
module.exports = (api, options, rootOptions) => {
  console.log(`\n${emoji.get('pizza')}  Thank you for using ${chalk.cyan('Rollup ESM Bundler Plugin')}`)
  console.log(`    For questions, issues and recommendations please visit: `)
  console.log(`    ${chalk.green('https://github.com/ti-pa-to/vue-cli-plugin-rollup-lib-bundler')}`)

  // Install Rollup and supporting packages
  api.extendPackage({
    devDependencies: {
      rollup: '*',
      'rollup-plugin-buble': '*',
      'rollup-plugin-uglify-es': '*',
      'rollup-plugin-vue': '*',
      minimist: '*'
    }
  })

  // Render template
  api.render('./template')
}
