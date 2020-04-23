const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    entry: {
        example: './example/src/index.js'
    },
    output: {
        filename: '[name].bundle.min.js',
        path: path.resolve(__dirname, "../dist/example")
    },
    devtool: 'inline-source-map',
    devServer: {
        compress: false,
        port: 8080,
        open: true,
        watchOptions: {
            poll: true
        },
        watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'IAMC React Query Builder - Example',
            inject: 'footer',
            template: './example/src/index.html'
        }),
    ]
});
