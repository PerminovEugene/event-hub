import * as express from 'express';
// import * as webpack from 'webpack';
// import * as webpackDevMiddleware from 'webpack-dev-middleware';
// import * as config from './../../framework/build/webpack.dev.client.config';
import { buildTemplate } from './page-template';
import { renderPageContent } from './page-content';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerEnvironmentManager } from '../../framework/configuration/server-environment-manager';
import { createStore } from 'redux';

const start = async () => {
  const manager = new ServerEnvironmentManager();
  await manager.loadEnvAsync({ path: 'config/server.env' });
  saveEnvManager(manager);
  const app = express();

  // This is broken
  // const compiler = webpack(config as any);

  // if (manager.isDevelopment()) {
  //   app.use(
  //     webpackDevMiddleware(compiler, {
  //       publicPath: config.output.publicPath,
  //     }),
  //   );
  // }

  app.use('/assets', express.static('assets'));

  app.get('*', (req, res, next) => {
    const context = {};
    const data = { foo: 'bar' };
    const store = createStore((state: any) => state, data);
    // TODO https://www.styled-components.com/docs/advanced#server-side-rendering
    const content = renderPageContent(req.url, context, store);
    // TODO
    // const jsFilePath = config.output.publicPath + config.output.filename,
    //   cssFilePath = config.output.publicPath + 'main.css';

    const jsFilePath = '/assets/' + 'bundle.js',
      cssFilePath = '/assets/' + 'main.css';

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
};

start();
