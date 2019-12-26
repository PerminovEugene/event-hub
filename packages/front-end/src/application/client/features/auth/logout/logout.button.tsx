import * as React from 'react';
import { ThemeButton } from '../../../components/button/button.component';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { WithRouterProps, RouteComponentProps } from 'react-router';

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

interface LogoutButtonProps extends Partial<RouteComponentProps> {}

const LogoutButton = ({ history }: LogoutButtonProps) => {
  const [logout] = useMutation(LOGOUT);
  return (
    <ThemeButton
      variant="contained"
      color="secondary"
      type="button"
      fullWidth
      onClick={async () => {
        const result = await logout();
        // debugger;
        history.push('/login');
        console.log(result);
      }}
    >
      logout
    </ThemeButton>
  );
};
export default withRouter(LogoutButton);
