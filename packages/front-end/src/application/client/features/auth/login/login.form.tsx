import * as React from 'react';
import schema from './validation.schema';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { FormWrapper, FormActions } from './../../../components/form/form.wrapper';
import { ElementView, FormElement } from './../../../components/form/form.elements';
import { LoginInput, SessionData } from '@calendar/shared';
import { getServerErrorData } from '../../../../../framework/helpers/graphql.helper';

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

const config: Array<FormElement> = [
  {
    label: 'Email',
    view: ElementView.textInput,
    attributes: {
      type: 'text',
      name: 'email',
      autocomplete: 'off',
    },
  },
  {
    label: 'Password',
    view: ElementView.textInput,
    attributes: {
      type: 'password',
      name: 'password',
      autocomplete: 'off',
    },
  },
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
      submitText="sign in" // TODO i18n'
      onSubmit={async (values: LoginInput, actions: FormActions<LoginInput>) => {
        try {
          await login({
            variables: {
              loginInput: { email: values.email, password: values.password },
            },
          });
          client.writeData({
            data: {
              isLoggedIn: true,
            },
          });
          actions.setStatus(null);
          history.push('/');
        } catch (e) {
          actions.setStatus(getServerErrorData(e));
        } finally {
          actions.setSubmitting(false);
        }
      }}
    />
  );
};

export default withRouter(LoginForm);
