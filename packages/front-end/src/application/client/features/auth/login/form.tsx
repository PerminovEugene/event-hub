import * as React from 'react';
import { ThemeButton } from '../../../components/button/button.component';
import { Formik, FormikActions, FormikProps, Form } from 'formik';
import { ElementView, FormElement, TextInput } from './form.elements';

export interface FormProps {
  validationSchema: any;
  initialValues: any;
  elements: FormElement[];
  submitText: string;
  onSubmit: (values: any, formikActions: FormikActions<any>) => Promise<void>;
}

export const FormWrapper = ({ validationSchema, initialValues, onSubmit, elements, submitText }: FormProps) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={(props: FormikProps<any>) => {
        return (
          <Form>
            {elements.map((element: FormElement) => (
              <React.Fragment>
                {element.view === ElementView.textInput && <TextInput element={element} {...props} />}
              </React.Fragment>
            ))}

            {/* {props.errors.email && <div id="feedback">{props.errors.email}</div>} */}
            <ThemeButton variant="contained" color="secondary" type="submit" disabled={!props.isValid} fullWidth>
              {submitText}
            </ThemeButton>
          </Form>
        );
      }}
    />
  );
};

export interface FormActions<Values> extends FormikActions<Values> {}
