const path = require('path');
const CracoLessPlugin = require("craco-less");

/* const { generateTheme } = require('antd-theme-generator');
const themeGeneratorOptions = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './src/assets/less'),
    varFile: path.join(__dirname, './src/assets/less/ant_variables.less'),
    themeVariables: ['@primary-color'],
    outputFilePath: path.join(__dirname, './public/assets/less/antd.less'),
}

generateTheme(themeGeneratorOptions).then(less => {
  console.log('Theme generated successfully');
})
.catch(error => {
  console.log('Error', error);
}) */

/* craco.config.js */
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "#00bfa5",
                        },
                        javascriptEnabled: true
                    }
                }
            }
        }
    ],
};