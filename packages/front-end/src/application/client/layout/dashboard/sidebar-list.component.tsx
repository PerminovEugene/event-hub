import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { AuthContext } from '../../contexts/auth.context';
import { allEventsRoute, createEventRoute, Route } from './../../navigation/routes';
import { isUserHasRights, Role } from '@calendar/shared';
import { generateNodeKey } from '../../../../framework/generators/string-generator';
import { Link } from 'react-router-dom';

type ListItemConfig = Route & {
  primary: string;
  IconComponent: React.ComponentType;
};

export const listItemsConfig: Array<ListItemConfig> = [
  {
    primary: 'Events calendar',
    IconComponent: CalendarTodayIcon,
    ...allEventsRoute,
  },
  {
    primary: 'Create event',
    IconComponent: AddCircleOutlineIcon,
    ...createEventRoute,
  },
];

type ListItemProps = {
  config: ListItemConfig;
  role: Role;
};

export const SidebarListItem = ({ config, role }: ListItemProps) => {
  return (
    <ListItem
      button
      component={Link}
      to={config.path}
      disabled={!isUserHasRights({ role, resource: config.resource, action: config.action })}
    >
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
