const path = require('path');
const webpack = require('webpack');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const rootPath = path.join(__dirname, '../../../');

module.exports = options => ({
  mode: 'development',
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
                  ssr: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.less', 'json'],
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin(), new CleanWebpackPlugin()],
});
