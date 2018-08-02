const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const emoji = require('node-emoji')

module.exports = (api, options, rootOptions) => {
  console.log(`\n${emoji.get('pizza')}  Thank you for using ${chalk.cyan('Rollup ESM Bundler Plugin')}`)
  console.log(`    For questions, issues and recommendations please visit: `)
  console.log(`    ${chalk.green('https://github.com/ti-pa-to/vue-cli-plugin-rollup-esm-bundler')}`)

  // Make sure the input comes in PascalCase and if not, this helper will convert whatever comes to PascalCase
  const pascalify = str => {
    const camelized = str.replace(/-([a-z])/g, c => c[1].toUpperCase())
    return camelized.charAt(0).toUpperCase() + camelized.slice(1)
  }
  options.componentNamePascal = pascalify(options.componentNamePascal)

  // Add kebab-case component name to the options (original options are coming from plugin prompts)
  const kebabcase = string =>
    string
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase()
  const kebabCaseName = kebabcase(options.componentNamePascal)
  Object.assign(options, { componentNameKebab: kebabCaseName })

  // Change default component filename to pascalcase
  fs.rename(
    path.join(__dirname, 'template/src/components/Component.vue'),
    path.join(__dirname, `template/src/components/${options.componentNamePascal}.vue`),
    err => {
      if (err) throw err
    }
  )

  // Install Rollup and supporting packages and add rollup scripts to build
  api.extendPackage({
    main: `dist/${kebabCaseName}.umd.js`,
    module: `dist/${kebabCaseName}.esm.js`,
    unpkg: `dist/${kebabCaseName}.min.js`,
    browser: {
      './sfc': `src/${kebabCaseName}.vue`
    },
    devDependencies: {
      rollup: '*',
      'rollup-plugin-buble': '*',
      'rollup-plugin-uglify-es': '*',
      'rollup-plugin-vue': '*'
    },
    scripts: {
      rollup: 'npm run rollup:unpkg & npm run rollup:es & npm run rollup:umd',
      'rollup:umd': `rollup --config src/rollup/rollup.config.js --format umd --file dist/${kebabCaseName}.umd.js`,
      'rollup:es': `rollup --config src/rollup/rollup.config.js --format es --file dist/${kebabCaseName}.esm.js`,
      'rollup:unpkg': `rollup --config src/rollup/rollup.config.js --format iife --file dist/${kebabCaseName}.min.js`
    }
  })

  // Render template
  api.render('./template', options)

  // Modify App.vue to include the new component
  api.onCreateComplete(() => {
    // get content
    const appPath = api.resolve('./src/App.vue')
    let contentMain = fs.readFileSync(appPath, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g).reverse()

    // inject Import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/))
    lines[lastImportIndex] += `\nimport ${options.componentNamePascal} from './components/${
      options.componentNamePascal
    }.vue'`

    // inject Component
    const lastCompononentIndex = lines.findIndex(line => line.match(/components/))
    lines[lastCompononentIndex] += `\n    ${options.componentNamePascal},`

    // inject HTML Tag
    const lastTagIndex = lines.findIndex(line => line.match(/logo.png/))
    lines[lastTagIndex] += `\n    <${options.componentNamePascal}/>`

    // modify app
    contentMain = lines.reverse().join('\n')
    fs.writeFileSync(appPath, contentMain, { encoding: 'utf-8' })
  })
}
