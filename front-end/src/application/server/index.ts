import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as config from './webpack.dev.config.js';
import { buildTemplate } from './page-template';
import { renderPageContent } from './page-content';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerEnvironmentManager } from '../../framework/configuration/server-environment-manager.js';
import { createStore } from 'redux';

const manager = new ServerEnvironmentManager();
manager.loadEnv({ path: 'config/server.env' });
saveEnvManager(manager);

const app = express(),
  compiler = webpack(config as any);

if (manager.isDevelopment()) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
}

// app.use('/assets/**/*', express.static(__dirname + '/assets'));
// app.use('/assets/*', express.static(__dirname + '/assets'));
// app.use('assets/js/*', express.static(__dirname + '/assets/js'));

app.get('*', (req, res, next) => {
  const context = {};
  const data = { foo: 'bar' };
  const store = createStore(state => state, data);
  const content = renderPageContent(req.url, context, store);
  const jsFilePath = config.output.publicPath + config.output.filename,
    cssFilePath = '';

  const storeData = JSON.stringify(data);
  const page = buildTemplate({ title: 'Hey', content, jsFilePath, cssFilePath, storeData });
  res.set('content-type', 'text/html');
  res.send(page);
  res.end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
