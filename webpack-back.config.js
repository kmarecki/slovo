const path = require('path');
const nodeExternals = require('webpack-node-externals');
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        server: './src/slovo-backend/app.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist/slovo-backend'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [new tsconfigPathsPlugin({ configFile: './src/slovo-backend/tsconfig.json' })]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        __dirname: false
    }
};
