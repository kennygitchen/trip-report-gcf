const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const buildProdJson = () => {

  // read pacage json
  const fs = require("fs");
  const prodPackageJson = JSON.parse(fs.readFileSync("package.json"));

  // modify the name of the module, prefix with @gcf
  prodPackageJson.name = `${prodPackageJson.name}--gcf`;
  delete prodPackageJson.devDependencies;
  delete prodPackageJson.scripts;

  return prodPackageJson;
}

module.exports = {
  target: "node",
  entry: {
    index: './index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: ['babel-loader'], exclude: /node_modules/},
      {test: /\.ts?$/, use: ['awesome-typescript-loader']},  // handle ts and tsx typescript files
    ]
  },
  externals: [
    /^(@google-cloud\/)/i
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([{from: 'serverless.yml', to: 'serverless.yml', toType: 'file'}]),
    new GeneratePackageJsonPlugin(buildProdJson(), `${__dirname}/package.json`)
  ]
};