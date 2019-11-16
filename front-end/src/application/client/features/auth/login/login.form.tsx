import * as React from 'react';
import { ThemeTextField } from '../../../components/text-field/text-field.component';
import { ThemeButton } from '../../../components/button/button.component';
import { Formik, FormikActions, FormikProps, Form } from 'formik';
import schema from './validation.schema';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

// TODO hell with typings
interface MyFormValues {
  email: string;
  password: string;
}

interface FormResult {
  id: number;
}

interface Form {
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

interface LoginFormProps extends Partial<RouteComponentProps> {}

const LoginForm = ({ history }: LoginFormProps) => {
  const [login] = useMutation<{ saveForm: FormResult }>(LOGIN);
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: undefined,
        password: undefined,
      }}
      onSubmit={async (values: MyFormValues, actions: FormikActions<MyFormValues>) => {
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
      render={(props: FormikProps<MyFormValues>) => {
        return (
          <Form>
            <ThemeTextField
              label="Email"
              name="email"
              fullWidth
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
              touched={props.touched.email}
              errorText={props.errors.email}
            />
            <ThemeTextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              touched={props.touched.password}
              errorText={props.errors.password}
            />
            {/* {props.errors.email && <div id="feedback">{props.errors.email}</div>} */}
            <ThemeButton variant="contained" color="secondary" type="submit" disabled={!props.isValid} fullWidth>
              sign in
            </ThemeButton>
          </Form>
        );
      }}
    />
  );
};
export default withRouter(LoginForm);
