const webpack = require('webpack');
const path = require('path');
const upath = require('upath');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    context: __dirname + '/src/slovo-app',
    entry: {
        admin: 'site.module.ts'
    },
    output: {
        path: path.resolve(__dirname, __dirname + '/dist/slovo-app'),
        filename: 'app-bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [new tsconfigPathsPlugin({ configFile: './src/slovo-app/tsconfig.json' })]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new copyWebpackPlugin([
            {
                from: '**/*.html',
                to: __dirname + '/dist/slovo-app'
            }
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
           })
    ],
    target: 'web'
};
