import * as React from 'react';
import schema from './validation.schema';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { FormWrapper, FormActions } from './../../../components/form/form.wrapper';
import { ElementView } from './../../../components/form/form.elements';
import { LoginInput, SessionData, RegistrationInput } from '@calendar/shared';

const REGISTRATION = gql`
  mutation registration($registrationInput: RegistrationInput!) {
    registration(registrationInput: $registrationInput) {
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
  { type: 'password', label: 'Password Confirm', view: ElementView.textInput, name: 'passwordConfirm' },
];

const initialValues: RegistrationInput = {
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
};

const RegistrationForm = ({ history }: Partial<RouteComponentProps>) => {
  const [registration] = useMutation<{ sessionData: SessionData }>(REGISTRATION);
  const client = useApolloClient();

  return (
    <FormWrapper
      validationSchema={schema}
      initialValues={initialValues}
      elements={config}
      submitText="sign in" // TODO i18n
      onSubmit={async (values: RegistrationInput, actions: FormActions<LoginInput>) => {
        try {
          const result = await registration({
            variables: {
              registrationInput: {
                email: values.email,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
              },
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

export default withRouter(RegistrationForm);
