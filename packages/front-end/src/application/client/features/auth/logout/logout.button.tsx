import * as React from 'react';
import { ThemeButton } from '../../../components/button/button.component';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

interface LogoutButtonProps extends Partial<RouteComponentProps> {}

const LogoutButton = ({ history }: LogoutButtonProps) => {
  const [logout] = useMutation(LOGOUT);
  const client = useApolloClient();

  return (
    <ThemeButton
      variant="contained"
      color="secondary"
      type="button"
      fullWidth
      onClick={async () => {
        const result = await logout();
        client.cache.reset();
        client.writeData({
          data: {
            isLoggedIn: false,
          },
        });
        history.push('/login');
      }}
    >
      logout
    </ThemeButton>
  );
};
export default withRouter(LogoutButton);