const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const rootPath = path.join(__dirname, '../../../'); //'/home/eugene/projects/startups/game/hipe-app/front-end';

module.exports = options => ({
  // entry: {
  //   main: path.join(rootPath, 'src/application/client/index.tsx'),
  // },
  // output: {
  //   path: path.join(rootPath, 'assets'), //'/home/eugene/projects/startups/game/hipe-app/front-end/assets'
  //   publicPath: '/assets/',
  //   filename: 'bundle.js',module.exports =
  // },
  mode: 'development',
  // target: 'web',
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.join(rootPath, options.tsConfigPath),
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: (resourcePath, context) => {
              //   // publicPath is the relative path of the resource to the context
              //   // e.g. for ./css/admin/main.css the publicPath will be ../../
              //   // while for ./css/main.css the publicPath will be ../
              //   return path.relative(path.dirname(resourcePath), context) + '/';
              // },
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              [
                'babel-plugin-styled-components',
                {
                  fileName: true,
                  minify: false,
                  pure: false,
                },
              ],
              // {
              //   ssr: false,
              // },
            ],
          },
        },
      },
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
      //   use: extractCSS.extract(['css-loader', 'postcss-loader']),
      // },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.less', 'json'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    //   ignoreOrder: false, // Enable to remove warnings about conflicting order
    // }),
  ],
});
