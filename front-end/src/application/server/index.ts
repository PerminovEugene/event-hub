import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as config from './webpack.dev.config.js';
import { buildTemplate } from './page-template';
import { renderPageContent } from './page-content';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { EnvironmentManager } from '../../framework/configuration/environment-manager.js';

const manager = new EnvironmentManager();
manager.loadEnv({ path: 'config/server.env' });
saveEnvManager(manager);

const app = express(),
  compiler = webpack(config as any);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
app.get('*', (req, res, next) => {
  const content = renderPageContent(req.url);
  const jsFilePath = '',
    cssFilePath = '';

  const page = buildTemplate({ title: 'Hey', content, jsFilePath, cssFilePath });
  res.send(page);
  res.set('content-type', 'text/html');
  res.end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
