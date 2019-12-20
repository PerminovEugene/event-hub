import * as express from 'express';
import { buildTemplate } from './page-template';
import { renderPageContent, Content } from './page-content';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerEnvironmentManager } from '../../framework/configuration/server-environment-manager';
// import { createStore } from 'redux';
import { options } from '../../provider/transport.server-options';
import { getTransport } from '../../provider/transport';

const start = async () => {
  const manager = new ServerEnvironmentManager();
  await manager.loadEnvAsync({ path: 'config/server.env' });
  saveEnvManager(manager);
  const app = express();

  app.use('/assets', express.static('assets'));
  app.use('/assets/images/*', (req, res, next) => {
    res.send(404);
    res.end();
  });

  app.get('*', (req, res, next) => {
    const context = {};
    const data = { foo: 'bar' }; //TODO
    // const store = createStore((state: any) => state, data);

    const store = {}
    const client = getTransport(options);
    const content: Content = renderPageContent(req.url, context, store, client);

    const jsFilePath = '/assets/' + 'bundle.js'; // TODO

    // const storeData = JSON.stringify(data);
    const page = buildTemplate({ title: 'Hey', jsFilePath, client, ...content });

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
