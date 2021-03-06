const path = require('path');
const getConfig = require('./webpack.config');
const rootPath = path.join(__dirname, '../../../');

const config = getConfig({
  tsConfigPath: 'tsconfig.json',
});

module.exports = {
  watchOptions: {
    ignored: ['src/**/*.test.*', 'node_modules'],
  },
  entry: {
    build: path.join(rootPath, 'src/application/server/index.ts'),
  },
  output: {
    path: path.join(rootPath, 'builded-server'),
    publicPath: '/builded-server/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },
  mode: 'development',
  target: 'node',
  // devtool: 'source-map',
  devtool: 'eval-source-map',
  resolve: {
    ...config.resolve,
  },
  module: {
    ...config.module,
  },
  plugins: [...config.plugins],
};
