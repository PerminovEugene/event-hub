import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import { SwitchWrapper } from './switch-wrapper';

type ServerRouterProps = {
  url: string;
  context: any;
};

export const ServerRouter = ({ url, context }: ServerRouterProps) => (
  <StaticRouter location={url} context={context}>
    <SwitchWrapper />
  </StaticRouter>
);
