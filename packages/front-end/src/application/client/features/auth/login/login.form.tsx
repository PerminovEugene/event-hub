import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { LoginInput, SessionData } from '@event-hub/shared';
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
import schema from './validation.schema';

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
  const [login] = useMutation<{ login: SessionData }>(LOGIN);
  const [t] = useTranslation('translations');
  const client = useApolloClient();
  return (
    <FormWrapper
      validationSchema={schema}
      initialValues={initialValues}
      elements={config}
      submitText={t('pages.login.submit')} // TODO i18n'
      onSubmit={async (values: LoginInput, actions: FormActions<LoginInput>) => {
        try {
          const result = await login({
            variables: {
              loginInput: { email: values.email, password: values.password },
            },
          });
          client.writeData({
            data: createMe(result.data.login),
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

export default withRouter(LoginForm);
