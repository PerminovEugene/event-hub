import * as React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LoginForm from './login.form';
import { ThemeLink } from './../../../components/link/link.component';
import { withTranslation, WithTranslation } from 'react-i18next';
import { PagePath } from '../../../navigation/pathes';

class LoginPage extends React.Component<WithTranslation, {}> {
  render() {
    const { t } = this.props;
    return (
      <Container component="main" maxWidth="sm">
        <Paper>
          <FormBox color="primary.contrastText" borderTop={1}>
            <Typography component="h1" variant="h5" color="primary" align="center">
              {t('sign-in:header')}
            </Typography>
            <LoginForm />
            <Typography component="p" color="primary" align="center">
              <ThemeLink to={PagePath.registration}>Have no account yet? Sign up</ThemeLink>
            </Typography>
            <Typography component="p" color="primary" align="center">
              <ThemeLink to={PagePath.restorePassword}>Forgot password?</ThemeLink>
            </Typography>
          </FormBox>
        </Paper>
      </Container>
    );
  }
}
export default withTranslation()(LoginPage);

const FormBox: React.ComponentType<any> = styled(Box)`
  max-width: 400px;
  margin: auto;
`;

const Paper: React.ComponentType<any> = styled.div`
  margin-top: 64px;
`;
