const getConfig = require('./webpack.config');
const Dotenv = require('dotenv-webpack');
// const Dotenv = dw.default || dw;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const EmitAllPlugin = require('webpack-emit-all-plugin');
const rootPath = path.join(__dirname, '../../../');

getVariablesPlugin = () => {
  return new Dotenv({
    path: './config/client.env',
    silent: true,
  });
};

const config = getConfig({
  tsConfigPath: 'client.tsconfig.json',
});

module.exports = {
  entry: {
    main: path.join(rootPath, 'src/application/client/index.tsx'),
  },
  output: {
    path: path.join(rootPath, 'assets'), //'/home/eugene/projects/startups/game/hipe-app/front-end/assets'
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  target: 'web',
  devtool: 'source-map',
  resolve: {
    ...config.resolve,
  },
  mode: config.mode,
  target: config.target,
  devtool: config.devtool,
  module: {
    ...config.module,
  },
  plugins: [
    getVariablesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    ...config.plugins,
  ],
};
