import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from "components/app";

const rootElement = document.getElementById('root');

const App = () => <div />;

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
}
