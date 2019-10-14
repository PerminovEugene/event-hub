import * as React from 'react';
import { ThemeTextField } from '../components/text-field/text-field.component';
import { ThemeButton } from '../components/button/button.component';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Formik, FormikActions, FormikProps, Form, Field, FieldProps } from 'formik';

interface MyFormValues {
  email: string;
  password: string;
  passwordRepeat: string;
}

export default class Registration extends React.Component<{}, {}> {
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Paper>
          <Box color="primary.contrastText" p={2} m={12} borderTop={1}>
            <FormHeader component="h1" variant="h5" color="primary">
              Sign up
            </FormHeader>
            <Formik
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
              render={(props: FormikProps<MyFormValues>) => (
                <Form>
                  <ThemeTextField
                    label="Email"
                    name="email"
                    autoFocus
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                  />
                  <ThemeTextField
                    label="Password"
                    type="password"
                    name="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                  />
                  <ThemeTextField
                    label="Password repeat"
                    type="password"
                    name="passwordRepeat"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                  />
                  {props.errors.email && <div id="feedback">{props.errors.email}</div>}
                  <ThemeButton variant="contained" color="secondary" type="submit">
                    sign up
                  </ThemeButton>
                </Form>
              )}
            />
          </Box>
        </Paper>
      </Container>
    );
  }
}

const Paper: React.ComponentType<any> = styled.div`
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
`;

const FormHeader: React.ComponentType<any> = styled(Typography)`
  text-align: center;
`;
