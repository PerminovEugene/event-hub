import * as React from 'react';
import { Switch, Route, StaticRouter } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import { PublicRoute } from './routes';
import { generateNodeKey } from '../../../framework/generators/string-generator';

const SwitchWrapper = () => (
  <Switch>
    {routes.publicRoutes.map((route: PublicRoute) => (
      <Route
        exact
        path={route.path}
        component={route.component}
        key={generateNodeKey(route.path)}
      />
    ))}
    <Route component={routes.notFound.component} />
  </Switch>
);

type ServerRouterProps = {
  url: string;
  context: any;
};

export const ServerRouter = ({ url, context }: ServerRouterProps) => (
  <StaticRouter location={url} context={context}>
    <SwitchWrapper />
  </StaticRouter>
);

// export const ClientRouter = () => (
//   <BrowserRouter>
//     <Switch>
//       {routes.publicRoutes.map((route: PublicRoute) => (
//         <Route
//           exact
//           path={route.path}
//           component={route.component}
//           key={generateNodeKey(route.path)}
//         />
//       ))}
//       <Route component={routes.notFound.component} />
//     </Switch>
//     {/* <SwitchWrapper /> */}
//   </BrowserRouter>
// );
