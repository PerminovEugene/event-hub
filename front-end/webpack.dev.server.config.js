const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EmitAllPlugin = require('webpack-emit-all-plugin');

const rootPath = path.join(__dirname, './');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractCSS = new ExtractTextPlugin('styles.min.css');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    build: path.join(rootPath, 'src/application/server/index.ts'),
  },
  output: {
    path: path.join(rootPath, 'builded-server'), //'/home/eugene/projects/startups/game/hipe-app/front-end/assets'
    publicPath: '/builded-server/',
    filename: '[name].js',
    sourceMapFilename: 'build/[name].js.map',
  },
  mode: 'development',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { configFile: path.join(rootPath, 'tsconfig.json') },
      },
      {
        test: /\.css$/,
        use: ['null-loader'],
        //   {
        //     loader: MiniCssExtractPlugin.loader,
        //     options: {
        //       // publicPath: (resourcePath, context) => {
        //       //   // publicPath is the relative path of the resource to the context
        //       //   // e.g. for ./css/admin/main.css the publicPath will be ../../
        //       //   // while for ./css/main.css the publicPath will be ../
        //       //   return path.relative(path.dirname(resourcePath), context) + '/';
        //       // },
        //     },
        //   },
        //   'css-loader',
        // ],
      },
      // {
      //   test: /\.(less)$/,
      //   use: ['css-hot-loader'].concat(
      //     extractCSS.extract({
      //       fallback: 'style-loader',
      //       use: [
      //         {
      //           loader: 'css-loader',
      //         },
      //         {
      //           loader: 'postcss-loader',
      //         },
      //         {
      //           loader: 'less-loader',
      //         },
      //       ],
      //     }),
      //   ),
      // },
      // {
      //   test: /\.css$/,
      //   use: extractCSS.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader',
      //   }),
      // },
      // {
      //   test: /\.css$/,
      //   // use: ['style-loader', 'postcss-loader'],
      //   use: extractCSS.extract([
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         path: '/home/eugene/projects/startups/game/hipe-app/front-end/src/framework/build/',
      //       },
      //     },
      //   ]),
      // },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         hmr: process.env.NODE_ENV === 'development',
      //         // you can specify a publicPath here
      //         // by default it uses publicPath in webpackOptions.output
      //         publicPath: '/assets/',
      //       },
      //     },
      //     'css-loader',
      //     'postcss-loader',
      //     // 'sass-loader',
      //   ],
      // },
      // {
      //   test: /\.jsx?$/,
      //   use: ['babel-loader', 'astroturf/loader'],
      // },
      // {
      //   test: /\.css$/,
      //   use: 'null-loader',
      // },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.less', 'json'],
    alias: {
      'dotenv-webpack': 'dotenv-webpack/dist/index.js',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // all options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    //   ignoreOrder: false, // Enable to remove warnings about conflicting order
    // }),
    // new EmitAllPlugin({
    //   ignorePattern: /node_modules/, /'.css'/ // default,
    //   path: path.join(__dirname, 'builded-server'), // defaults to `output.path`
    // }),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: devMode ? '[name].css' : '[name].[hash].css',
    //   chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    // }),
  ],
};
