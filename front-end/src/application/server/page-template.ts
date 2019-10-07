export type PageTemplateParams = {
  title: string;
  content: string;
  jsFilePath: string;
  cssFilePath: string;
  storeData: any;
};

export const buildTemplate = ({ title, content, jsFilePath, cssFilePath, storeData }: PageTemplateParams) =>
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${title}</title>
      <link rel="stylesheet" href="${cssFilePath}" />
      <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon">
    </head>
    <body>
      <div id="root">${content}</div>

      <script type="application/json" id="data">${storeData.replace(/</g, '&lt;')}</script>
      <script  type="text/javascript" src="${jsFilePath}"></script>
    </body>
  </html>
  `;
