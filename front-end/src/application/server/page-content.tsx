import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Application } from '../client/application';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

export type Content = {
  html: string;
  css: string;
};

export const renderPageContent = (url: string, context: any, store: any): Content => {
  const sheet = new ServerStyleSheet(); // styled components
  try {
    const sheets = new ServerStyleSheets(); // material UI styles
    const html = renderToString(
      sheet.collectStyles(sheets.collect(<Application url={url} context={context} store={store} />)),
    );

    return {
      html: html,
      css: { tags: sheet.getStyleTags(), string: sheets.toString() } as any,
    };
  } catch (error) {
    // TODO log error
    throw error;
  } finally {
    sheet.seal();
  }
};
