import * as React from 'react';
import { ThemeButton } from '../button/button.component';
import { Formik, FormikActions, FormikProps, Form } from 'formik';
import { ElementView, FormElement, TextInput } from './form.elements';

// type FormFields = { [fieldName: string]: string };
type FormFields = any;

export interface FormProps {
  validationSchema: any;
  initialValues: FormFields;
  elements: FormElement[];
  submitText: string;
  onSubmit: (values: FormFields, formikActions: FormikActions<FormFields>) => Promise<void>;
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
