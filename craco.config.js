const CracoAntDesignPlugin = require("craco-antd");

/* craco.config.js */
module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    "@primary-color": "#1DA57A",
                },
            },
        },
    ],
};