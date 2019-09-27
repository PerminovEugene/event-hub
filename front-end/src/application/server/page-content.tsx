import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Application } from '../client/application';

export const renderPageContent = (url: string, context: any, store: any) =>
  renderToString(<Application url={url} context={context} store={store} />);
