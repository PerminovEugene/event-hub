import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './application';
import { ClientEnvironmentManager } from '../../framework/configuration/client-environment-manager';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { getTransport } from '../../provider/transport';
import { getOptions } from '../../provider/transport.client-options';
import { ClientRouter } from './navigation/client-router';

const manager = new ClientEnvironmentManager();
manager.loadEnv();
saveEnvManager(manager);

export class EntryPoint {
  public start = () => {
    const rootElement = document.getElementById('root');
    const client = getTransport(getOptions());
    if (rootElement) {
      ReactDOM.hydrate(
        <Application client={client}>
          <ClientRouter />
        </Application>,
        rootElement,
      );
    }
  };
}

//   public initStore = (client: any) => (
//     // let store = createStore(
//       // reducer,
//       // (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
//     // );
//     createStore(
//     combineReducers({
//       reducer: reducer,
//       apollo: client.reducer(),
//     }),
//     clientRestoreData(),
//     compose(
//         applyMiddleware(client.middleware()),
//         (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f,
//     ))
//   )
// }

const entryPoint = new EntryPoint();

// export function reducer(state: any, action: any) {
//   if (!action) {
//     return state;
//   }

//   if (action.type === 'UPDATE_STORE') {
//     return action.payload;
//   }

//   return state;
// }

entryPoint.start();
