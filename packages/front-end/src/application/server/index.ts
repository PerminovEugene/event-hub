import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as Backend from 'i18next-node-fs-backend';
import { resolve as resolvePath } from 'path';
import { realpathSync } from 'fs';
import { initI18n, I18nNamespaces } from './../../framework/managers/i18n.manager';
import { buildTemplate } from './page-template';
import { renderPageContent, Content } from './page-content';
import { saveEnvManager, getEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerEnvironmentManager } from '../../framework/configuration/server-environment-manager';
import { buildOptions } from '../../provider/transport.server-options';
import { getTransport } from '../../provider/transport';

const i18nextMiddleware = require('i18next-express-middleware');

export class EntryPoint {
  private appSrc: string = null;
  private i18n: any = null;

  constructor() {
    const appDirectory = realpathSync(process.cwd());
    const resolveApp = (relativePath: string) => resolvePath(appDirectory, relativePath);
    this.appSrc = resolveApp('src');
  }

  public start = async () => {
    await this.setupEnvironment();
    await this.setupI18n();
    const app = this.setupApp();
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`App listening to ${PORT}....`);
      console.log('Press Ctrl+C to quit.');
    });
  };

  protected setupEnvironment = async () => {
    const manager = new ServerEnvironmentManager();
    await manager.loadEnvAsync({ path: 'config/server.env' });
    saveEnvManager(manager);
  };

  protected setupI18n = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      this.i18n = await initI18n();
      this.i18n
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init(
          {
            debug: getEnvManager().getDebugI18n(),
            preload: ['en', 'ru'],
            ns: [I18nNamespaces.translations],
            defaultNS: I18nNamespaces.translations,
            backend: {
              loadPath: `${this.appSrc}/application/locales/{{lng}}/{{ns}}.json`,
              addPath: `${this.appSrc}/application/locales/{{lng}}/{{ns}}.missing.json`,
            },
          },
          (errors: any) => {
            if (errors) {
              return reject(errors);
            }
            resolve();
          },
        );
    });
  };

  protected setupApp = () => {
    const app = express();
    app.use(cookieParser());

    app
      .disable('x-powered-by')
      .use(i18nextMiddleware.handle(this.i18n))
      .use('/locales', express.static(`${this.appSrc}/application/locales`));

    app.use('/assets', express.static('assets'));
    app.use('/assets/images/*', (req, res, next) => {
      // TODO add images handling
      res.send(404);
      res.end();
    });

    // move to manager
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
    });

    return app;
  };
}

const entryPoint = new EntryPoint();
entryPoint.start();
