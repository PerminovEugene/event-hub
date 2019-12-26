import * as express from 'express';
import { buildTemplate } from './page-template';
import { renderPageContent, Content } from './page-content';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerEnvironmentManager } from '../../framework/configuration/server-environment-manager';
// import { createStore } from 'redux';
import { buildOptions } from '../../provider/transport.server-options';
import { getTransport } from '../../provider/transport';
import * as cookieParser from 'cookie-parser';

const start = async () => {
  const manager = new ServerEnvironmentManager();
  await manager.loadEnvAsync({ path: 'config/server.env' });
  saveEnvManager(manager);

  const app = express();
  app.use(cookieParser());

  app.use('/assets', express.static('assets'));
  app.use('/assets/images/*', (req, res, next) => {
    // TODO
    res.send(404);
    res.end();
  });
  app.get('*', async (req: any, res, next) => {
    const context = {};
    const transportOptions = buildOptions({ isLoggedIn: !!req.cookie && req.cookie['conect.sid'] });
    const client = getTransport(transportOptions);

    const content: Content = await renderPageContent(req.url, context, client);

    const jsFilePath = '/assets/' + 'bundle.js'; // TODO

    const page = buildTemplate({ title: 'Hey', jsFilePath, ...content });

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
