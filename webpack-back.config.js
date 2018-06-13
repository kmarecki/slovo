const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        server: './server/app.ts'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: 'ts-loader'
            }
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        __dirname: false
    }
};
