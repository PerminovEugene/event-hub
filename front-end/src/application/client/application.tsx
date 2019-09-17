import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Router from './navigation/router';

export class Application {
  initialize = () => {
    const rootElement = document.getElementById('root');

    if (rootElement) {
      ReactDOM.render(<Router />, rootElement);
    }
  };
}
