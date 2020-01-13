import * as React from 'react';
import { ThemeButton } from '../../../components/button/button.component';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { createMe } from '../../../../../provider/store.actions/me';

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
      color="secondary"
      type="button"
      size="small"
      onClick={async () => {
        const result = await logout();
        client.cache.reset();
        client.writeData({
          data: createMe(),
        });
        history.push('/login');
      }}
    >
      logout
    </ThemeButton>
  );
};
export default withRouter(LogoutButton);
