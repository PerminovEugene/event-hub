import * as React from 'react';
import schema from './validation.schema';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { FormWrapper, FormActions } from './../../../components/form/form.wrapper';
import { ElementView } from './../../../components/form/form.elements';
import { LoginInput, SessionData } from '@calendar/shared';

const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      email
      role
      id
      status
    }
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
  const client = useApolloClient();
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
          // TODO facade
          client.writeData({
            data: {
              isLoggedIn: true,
            },
          });
          history.push('/');
          actions.setSubmitting(false);
        } catch (e) {
          debugger;
          // TODO
          console.warn(e);
        }
      }}
    />
  );
};

export default withRouter(LoginForm);
