import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Application from '../client/application';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerRouter } from '../client/navigation/server-router';
import { getDataFromTree } from '@apollo/react-ssr';

export type Content = {
  html: string;
  css: string;
  initialState: any;
};

const AppRender = ({ url, context, client }: any) => (
  <Application url={url} context={context} client={client}>
    <ServerRouter url={url} context={context} />
  </Application>
);

export const renderPageContent = async (url: string, context: any, client: any): Promise<Content> => {
  const sheet = new ServerStyleSheet(); // styled components
  try {
    console.log('render1 ');
    const App = AppRender({ url, context, client });
    console.log('render2 ');

    await getDataFromTree(App);
    console.log('render3 ');

    const sheets = new ServerStyleSheets(); // material UI styles

    console.log('render4 ');
    const html = renderToString(sheet.collectStyles(sheets.collect(App)));

    return {
      html: html,
      css: { tags: sheet.getStyleTags(), string: sheets.toString() } as any,
      initialState: client.extract(),
    };
  } catch (error) {
    // TODO log error
    throw error;
  } finally {
    sheet.seal();
  }
};
