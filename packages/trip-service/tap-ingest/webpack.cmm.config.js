const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        // filename: '[name].bundle.[hash].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.ts?$/, use: ['awesome-typescript-loader']},  // handle ts and tsx typescript files
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{from: 'package.deploy.json', to: 'package.json', toType: 'file'}])
    ]
};