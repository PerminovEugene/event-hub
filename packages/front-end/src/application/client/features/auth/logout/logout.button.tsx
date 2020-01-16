import * as React from 'react';
import { ThemeButton } from '../../../components/button/button.component';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { createMe } from '../../../../../provider/store.actions/me';
import { deleteCookie } from '../../../../../framework/managers/cookie.manager';
import { PagePath } from '../../../navigation/pathes';
import { useTranslation } from 'react-i18next';

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

interface LogoutButtonProps extends Partial<RouteComponentProps> {}

const LogoutButton = ({ history }: LogoutButtonProps) => {
  const [logout] = useMutation(LOGOUT);
  const client = useApolloClient();
  const [t] = useTranslation('translations');
  return (
    <ThemeButton
      type="button"
      size="small"
      onClick={async () => {
        await logout();
        client.cache.reset();
        client.writeData({
          data: createMe(),
        });
        deleteCookie('user');
        deleteCookie('connect.sid');
        history.push(PagePath.login);
      }}
    >
      {t('components.logout.submit')}
    </ThemeButton>
  );
};
export default withRouter(LogoutButton);
