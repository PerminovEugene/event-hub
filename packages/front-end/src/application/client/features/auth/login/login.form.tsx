import * as React from 'react';
import { FormikActions } from 'formik';
import schema from './validation.schema';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { FormWrapper, FormActions } from './form';
import { ElementView } from './form.elements';

interface User {
  email: string;
  role: string;
  id: number;
  status: string;
}

interface LoginFormFields {
  email: string;
  password: string;
}

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

const initialValues: LoginFormFields = {
  email: undefined,
  password: undefined,
};
interface LoginFormProps extends Partial<RouteComponentProps> {}

const LoginForm = ({ history }: LoginFormProps) => {
  const [login] = useMutation<{ user: User }>(LOGIN);
  return (
    <FormWrapper
      validationSchema={schema}
      initialValues={initialValues}
      elements={config}
      submitText="sign in" // TODO i18n
      onSubmit={async (values: LoginFormFields, actions: FormActions<LoginFormFields>) => {
        try {
          const result = await login({
            variables: { email: values.email, password: values.password },
          });
          // TODO
          // save session data to the storage
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
