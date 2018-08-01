module.exports = function(api) {
  return {
    getPostCSSConfig() {
      const package_json_config = api.generator.originalPkg.postcss
      const isExternalConfig = api.generator.originalPkg.postcss ? false : true

      // PostCSS config is in package.json. Need to extract it and at the end delete postcss config from package.json
      if (!isExternalConfig) {
        // console.log(package_json_config)
        const existingPluginNamesArray = Object.keys(package_json_config.plugins)
        // console.log(existingPluginNamesArray)
        delete api.generator.pkg.postcss
      }
    }
  }
}
