import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Application } from '../client/application';

export const renderPageContent = (url: string) => renderToString(<Application url={url} />);
