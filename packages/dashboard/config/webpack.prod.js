const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')


const prodConfig = {
    mode: "production",
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/dashboard/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "dashboard",
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp':'./src/bootstrap',
            },
            // shared: ['react', 'react-dom'],
            // shared:Object.keys(packageJson.dependencies), 
            shared:packageJson.dependencies,
        })
    ],
}

module.exports = merge(commonConfig, prodConfig)
