const config = require('./webpack.config');
const Dotenv = require('dotenv-webpack');
// const Dotenv = dw.default || dw;

getVariablesPlugin = () => {
  return new Dotenv({
    path: './config/client.env',
    silent: true,
  });
};

module.exports = {
  entry: {
    ...config.entry,
  },
  output: {
    ...config.output,
  },
  resolve: {
    ...config.resolve,
  },
  mode: config.mode,
  target: config.target,
  devtool: config.devtool,
  module: {
    ...config.module,
  },
  plugins: [getVariablesPlugin(), ...config.plugins],
};
