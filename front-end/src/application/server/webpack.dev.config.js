const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const assets = 'assets';
const jsBundle = assets + '/js';

module.exports = {
  entry: {
    main: '/home/eugene/projects/startups/game/hipe-app/front-end/dist/application/client/index.js'
  },
  output: {
    path: path.join(__dirname, '/home/eugene/projects/startups/game/hipe-app/front-end/assets'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
            //options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './config/client.env',
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false // hide any errors
      // defaults: false // load '.env.defaults' as the default values if empty.
    }),
    // new CleanWebpackPlugin([jsBundle]),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

console.log(__dirname);
