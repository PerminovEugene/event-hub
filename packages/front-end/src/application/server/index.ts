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
    // TODO add images handling
    res.send(404);
    res.end();
  });

  const isSessionCookieExist = (req: any) => !!(req.cookies && req.cookies['connect.sid']);
  const getUserCookie = (req: any) => (isSessionCookieExist(req) ? req.cookies['user'] : null);

  app.get('*', async (req: any, res, next) => {
    const context = {};
    console.log('USER', JSON.parse(getUserCookie(req)));
    const transportOptions = buildOptions({ user: JSON.parse(getUserCookie(req)) });
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
