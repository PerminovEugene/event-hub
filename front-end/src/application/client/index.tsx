import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Application } from './application';

export class EntryPoint {
  initialize = () => {
    const rootElement = document.getElementById('root');

    if (rootElement) {
      ReactDOM.hydrate(<Application />, rootElement);
    }
  };
}

new EntryPoint();
