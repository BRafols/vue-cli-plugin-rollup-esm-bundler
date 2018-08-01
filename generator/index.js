const chalk = require('chalk')
const emoji = require('node-emoji')
module.exports = (api, options, rootOptions) => {
  const postcssHelpers = require('./postcss-helpers')(api)

  console.log(`\n${emoji.get('coffee')}  Thank you for using ${chalk.cyan('Tailwind / Purge CSS Plugin')}`)
  console.log(`    For questions, issues and recommendations please visit: `)
  console.log(`    ${chalk.green('https://github.com/ti-pa-to/vue-cli-plugin-tailwind-purge-css')}`)

  // Install Tailwind and Purge CSS packages
  api.extendPackage({
    devDependencies: {
      tailwindcss: '*',
      '@fullhuman/postcss-purgecss': '*'
    }
  })

  // Render template (before PostCSS manipulations because we need the fresh .postcssrc.js ready at the plugin)
  api.render('./template')

  // Remove existing postcss config
  postcssHelpers.getPostCSSConfig()

  // Modify main (.js | .ts)
  api.onCreateComplete(() => {
    // inject to main.js
    const fs = require('fs')
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js'
    const mainPath = api.resolve(`./src/main.${ext}`)

    // get content
    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g).reverse()

    // inject import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/))
    lines[lastImportIndex] += `\n\n// Tailwind\nimport './tailwind/tailwind.css'`

    // modify app
    contentMain = lines.reverse().join('\n')
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' })
  })
}
