import * as React from 'react';
import { ThemeTextField } from '../../components/text-field/text-field.component';
import { ThemeButton } from '../../components/button/button.component';
import { Formik, FormikActions, FormikProps, Form, Field, FieldProps } from 'formik';
import schema from './validation.schema';
import Typography from '@material-ui/core/Typography';

interface MyFormValues {
  email: string;
  password: string;
  passwordRepeat: string;
}

export default class RegistrationForm extends React.Component<{}, {}> {
  render() {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          email: undefined,
          password: undefined,
          passwordRepeat: undefined,
        }}
        onSubmit={(values: MyFormValues, actions: FormikActions<MyFormValues>) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
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
              <ThemeTextField
                label="Password repeat"
                type="password"
                name="passwordRepeat"
                fullWidth
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.passwordRepeat}
                touched={props.touched.passwordRepeat}
                errorText={props.errors.passwordRepeat}
              />
              {/* {props.errors.email && <div id="feedback">{props.errors.email}</div>} */}
              <ThemeButton variant="contained" color="secondary" type="submit" disabled={!props.isValid} fullWidth>
                sign up
              </ThemeButton>
            </Form>
          );
        }}
      />
    );
  }
}
