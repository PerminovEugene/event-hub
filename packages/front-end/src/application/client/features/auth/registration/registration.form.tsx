import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { LoginInput, RegistrationInput, SessionData } from '@event-hub/shared';
import gql from 'graphql-tag';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { getServerErrorData } from '../../../../../framework/helpers/graphql.helper';
import { createMe } from '../../../../../provider/store.actions/me';
import { PagePath } from '../../../navigation/pathes';
import { ElementView, FormElement } from './../../../components/form/form.elements';
import { FormActions, FormWrapper } from './../../../components/form/form.wrapper';
import getRegistrationValidationSchema from './validation.schema';

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
      autocomplete: 'off',
      type: 'password',
      name: 'password',
    },
  },
  {
    label: 'Password Confirm',
    view: ElementView.textInput,
    attributes: {
      autocomplete: 'off',
      type: 'password',
      name: 'passwordConfirm',
    },
  },
];

const initialValues: RegistrationInput = {
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
};

const RegistrationForm = ({ history }: Partial<RouteComponentProps>) => {
  const [registration] = useMutation<{ registration: SessionData }>(REGISTRATION);
  const [t] = useTranslation('translations');
  const client = useApolloClient();
  return (
    <FormWrapper
      validationSchema={getRegistrationValidationSchema()}
      initialValues={initialValues}
      elements={config}
      submitText={t('pages.registration.submit')}
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
          client.writeData({
            data: createMe(result.data.registration),
          });
          actions.setStatus(null);
          history.push(PagePath.root);
        } catch (e) {
          actions.setStatus(getServerErrorData(e));
        } finally {
          actions.setSubmitting(false);
        }
      }}
    />
  );
};

export default withRouter(RegistrationForm);
