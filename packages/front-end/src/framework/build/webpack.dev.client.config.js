const getConfig = require('./webpack.config');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const rootPath = path.join(__dirname, '../../../');

const config = getConfig({
  tsConfigPath: 'client.tsconfig.json',
});

module.exports = {
  watchOptions: {
    ignored: ['src/**/*.test.*', 'node_modules'],
  },
  entry: {
    main: path.join(rootPath, 'src/application/client/index.tsx'),
  },
  output: {
    path: path.join(rootPath, 'assets'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  target: 'web',
  devtool: 'eval-source-map',
  resolve: {
    ...config.resolve,
  },
  mode: config.mode,
  module: {
    ...config.module,
  },
  plugins: [
    new Dotenv({
      path: './config/client.env',
      silent: true,
    }),
    ...config.plugins,
  ],
};
