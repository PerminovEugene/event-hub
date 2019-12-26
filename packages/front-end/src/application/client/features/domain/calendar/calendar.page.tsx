import * as React from 'react';
import Calendar from '../../../components/calendar/calendar.component';
import LogoutButton from '../../auth/logout/logout.button';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { PagePath } from '../../../navigation/pathes';
import { ThemeLink } from '../../../components/link/link.component';

type Props = {};

const IS_USER_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const Root = () => {
  const {
    // data: { isLoggedIn },
    data,
  } = useQuery(IS_USER_LOGGED_IN);
  console.log('data:', data);
  const isLoggedIn = false;
  return (
    <div>
      {isLoggedIn && <LogoutButton />}
      {!isLoggedIn && <ThemeLink to={PagePath.login}>Sign in</ThemeLink>}
      <Calendar />
    </div>
  );
};
export default Root;
