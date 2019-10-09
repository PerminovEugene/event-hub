import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Application } from '../client/application';
import { ServerStyleSheet } from 'styled-components';

export type Content = {
  html: string;
  css: string;
};

export const renderPageContent = (url: string, context: any, store: any): Content => {
  try {
    const sheet = new ServerStyleSheet();
    const html = renderToString(sheet.collectStyles(<Application url={url} context={context} store={store} />));
    const styleTags = sheet.getStyleTags();
    sheet.seal();
    return {
      html: html,
      css: styleTags,
    };
  } catch (error) {
    // TODO log error
    throw error;
  }
};
