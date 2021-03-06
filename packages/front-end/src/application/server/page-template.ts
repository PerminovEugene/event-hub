export type PageTemplateParams = {
  title: string;
  html: string;
  jsFilePath: string;
  css: any; //string;
  initialState: any;
  initialI18nStore: any;
  initialLanguage: any;
};

export const buildTemplate = ({
  title,
  html,
  jsFilePath,
  css,
  initialState,
  initialI18nStore,
  initialLanguage,
}: PageTemplateParams) =>
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <noscript id="jss-insertion-point"></noscript>

      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${title}</title>

      ${css.tags}
      <style id="jss-server-side">${css.string}</style>


      <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon">
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.initialI18nStore = JSON.parse('${JSON.stringify(initialI18nStore)}');
        window.initialLanguage = '${initialLanguage}';
      </script>
      <script>
        window.__APOLLO_STATE__=${JSON.stringify(initialState)};
      </script>
      <script  type="text/javascript" src="${jsFilePath}"></script>
      
    </body>
    
  </html>
  `;

// export const buildHtml = () => {}
