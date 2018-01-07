const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('docs/app'),
        filename: 'bundle.[hash].js',
    },
    devServer: {
        contentBase: path.resolve('docs/app'),
        host: '0.0.0.0',
        port: 8282
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/app.html',
            favicon: './src/img/icon192x192.png',
            filename: 'index.html'
        }),
        new htmlWebpackPlugin({
            inject: false,
            template: './public/index.html',
            filename: '../index.html'
        }),
        new CopyWebpackPlugin([
            { from: './public/manifest.json'}
        ]),
        new OfflinePlugin()
    ]
}