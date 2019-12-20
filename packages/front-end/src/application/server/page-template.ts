export type PageTemplateParams = {
  title: string;
  html: string;
  jsFilePath: string;
  css: any; //string;
  client: any;
};

export const buildTemplate = ({ title, html, jsFilePath, css, client }: PageTemplateParams) =>
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

      <script  type="text/javascript" src="${jsFilePath}"></script>
      <script>
      window.__APOLLO_STATE__=${JSON.stringify(client.extract())};
    </script>
    </body>
    
  </html>
  `;
// <script type="application/json" id="data">${storeData.replace(/</g, '&lt;')}</script>
