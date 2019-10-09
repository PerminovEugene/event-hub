export type PageTemplateParams = {
  title: string;
  html: string;
  jsFilePath: string;
  css: string;
  storeData: any;
};

export const buildTemplate = ({ title, html, jsFilePath, css, storeData }: PageTemplateParams) =>
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${title}</title>
      ${css}
      <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon">
    </head>
    <body>
      <div id="root">${html}</div>

      <script type="application/json" id="data">${storeData.replace(/</g, '&lt;')}</script>
      <script  type="text/javascript" src="${jsFilePath}"></script>
    </body>
  </html>
  `;
