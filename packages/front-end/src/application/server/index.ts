import * as express from 'express';
import { buildTemplate } from './page-template';
import { renderPageContent, Content } from './page-content';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerEnvironmentManager } from '../../framework/configuration/server-environment-manager';
import { buildOptions } from '../../provider/transport.server-options';
import { getTransport } from '../../provider/transport';
import * as cookieParser from 'cookie-parser';

import { initI18n } from './i18n';
import * as Backend from 'i18next-node-fs-backend';
import { resolve } from 'path';
import { realpathSync } from 'fs';
const i18nextMiddleware = require('i18next-express-middleware');

const start = async (i18n: any) => {
  const manager = new ServerEnvironmentManager();
  await manager.loadEnvAsync({ path: 'config/server.env' });
  saveEnvManager(manager);

  const app = express();
  app.use(cookieParser());

  app
    .disable('x-powered-by')
    .use(i18nextMiddleware.handle(i18n))
    .use('/locales', express.static(`${appSrc}/application/locales`));
  // .use(express.static(process.env.RAZZLE_PUBLIC_DIR));

  app.use('/assets', express.static('assets'));
  app.use('/assets/images/*', (req, res, next) => {
    // TODO add images handling
    res.send(404);
    res.end();
  });

  const isSessionCookieExist = (req: any) => !!(req.cookies && req.cookies['connect.sid']);
  const getUserCookie = (req: any): string | null => (isSessionCookieExist(req) ? req.cookies['user'] : null);

  app.get('*', async (req: any, res, next) => {
    const context: any = {};

    let userCookie: any = getUserCookie(req);
    if (userCookie) {
      userCookie = JSON.parse(userCookie);
    }
    const transportOptions = buildOptions({ user: userCookie });
    const client = getTransport(transportOptions);

    const content: Content = await renderPageContent(req.url, context, client, req.i18n);

    // const { url } = context;
    // if (url) {
    //   return res.redirect(url);
    // } else {
    const initialI18nStore: any = {};
    req.i18n.languages.forEach((language: any) => {
      initialI18nStore[language] = req.i18n.services.resourceStore.data[language];
    });
    const initialLanguage = req.i18n.language;

    const jsFilePath = '/assets/' + 'bundle.js'; // TODO

    const page = buildTemplate({ title: 'Hey', jsFilePath, initialI18nStore, initialLanguage, ...content });

    res.set('content-type', 'text/html');
    res.send(page);
    res.end();
    // }
  });

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
  });
};

// NEW

const appDirectory = realpathSync(process.cwd());
const resolveApp = (relativePath: string) => resolve(appDirectory, relativePath);
const appSrc = resolveApp('src');

const superStart = async () => {
  const i18n = await initI18n();
  i18n
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(
      {
        debug: false,
        preload: ['en', 'ru'],
        ns: ['translations'],
        defaultNS: 'translations',
        backend: {
          loadPath: `${appSrc}/application/locales/{{lng}}/{{ns}}.json`,
          addPath: `${appSrc}/application/locales/{{lng}}/{{ns}}.missing.json`,
        },
      },
      function() {
        console.log(arguments);
        start(i18n);
      },
    );
};
superStart();
