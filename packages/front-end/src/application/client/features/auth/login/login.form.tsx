import * as React from 'react';
import schema from './validation.schema';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { FormWrapper, FormActions } from './../../../components/form/form.wrapper';
import { ElementView } from './../../../components/form/form.elements';
import { LoginInput, SessionData } from '@calendar/shared';

const LOGIN = gql`
  mutation login_success {
    isLoggedIn: true
  }
`;

const SET_LOGIN_STATUS = gql`
  mutation setLoginStatus($Status: Boolean!) {
    isLoggedIn @client
  }
`;

const config = [
  { type: 'text', label: 'Email', view: ElementView.textInput, name: 'email' },
  { type: 'password', label: 'Password', view: ElementView.textInput, name: 'password' },
];

const initialValues: LoginInput = {
  email: undefined,
  password: undefined,
};

const LoginForm = ({ history }: Partial<RouteComponentProps>) => {
  const [login] = useMutation<{ sessionData: SessionData }>(LOGIN);
  return (
    <FormWrapper
      validationSchema={schema}
      initialValues={initialValues}
      elements={config}
      submitText="sign in" // TODO i18n
      onSubmit={async (values: LoginInput, actions: FormActions<LoginInput>) => {
        try {
          const result = await login({
            variables: {
              loginInput: { email: values.email, password: values.password },
            },
          });

          history.push('/');
          actions.setSubmitting(false);
        } catch (e) {
          // TODO
          console.warn(e);
        }
      }}
    />
  );
};

export default withRouter(LoginForm);
