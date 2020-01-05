import * as React from 'react';
import { ThemeButton } from '../button/button.component';
import { Formik, FormikActions, FormikProps, Form } from 'formik';
import { ElementView, FormElement, TextInput, StyledBaseError } from './form.elements';
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
            {elements.map((element: FormElement, index) => (
              <React.Fragment key={index}>
                {element.view === ElementView.textInput && <TextInput element={element} {...props} />}
              </React.Fragment>
            ))}

            {props.status && <StyledBaseError error={props.status} />}
            <ThemeButton
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!props.isValid || props.isSubmitting}
              fullWidth
            >
              {submitText}
            </ThemeButton>
          </Form>
        );
      }}
    />
  );
};

export interface FormActions<Values> extends FormikActions<Values> {}
