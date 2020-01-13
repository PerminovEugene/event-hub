import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { AuthContext } from '../../contexts/auth.context';
import { allEventsRoute, createEventRoute, Route } from './../../navigation/routes';
import { isUserHasRights } from '@calendar/shared';
import { generateNodeKey } from '../../../../framework/generators/string-generator';

type ListItemConfig = Route & {
  primary: string;
  IconComponent: React.ComponentType;
};

export const listItemsConfig: Array<ListItemConfig> = [
  {
    primary: 'Events calendar',
    IconComponent: DashboardIcon,
    ...allEventsRoute,
  },
  {
    primary: 'Create event',
    IconComponent: DashboardIcon,
    ...createEventRoute,
  },
];

export const SidebarListItem = ({ config, role }: any) => {
  console.log(config, role);
  return (
    <ListItem button disabled={isUserHasRights({ role, resource: config.resource, action: config.action })}>
      <ListItemIcon>
        <config.IconComponent />
      </ListItemIcon>
      <ListItemText primary={config.primary} />
    </ListItem>
  );
};

export const SidebarList = () => (
  <AuthContext.Consumer>
    {({ user }) => (
      <List>
        {listItemsConfig.map(config => (
          <SidebarListItem config={config} role={user.role} key={generateNodeKey(`navigation-${config.path}`)} />
        ))}
      </List>
    )}
  </AuthContext.Consumer>
);
