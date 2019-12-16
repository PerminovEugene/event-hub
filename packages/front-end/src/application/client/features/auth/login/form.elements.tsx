import * as React from 'react';
import { ThemeTextField } from '../../../components/text-field/text-field.component';
import { FormikProps } from 'formik';

export enum ElementView {
  textInput = 'textInput',
}

export interface FormElement {
  type: string;
  label: string;
  name: string;
  view: ElementView;
}

interface TextInputProps {
  element: FormElement;
  formProps: FormikProps<any>;
}

export const TextInput = ({ element, handleChange, handleBlur, values, touched, errors }: any) => {
  console.log('re render');
  return (
    <ThemeTextField
      label={element.label}
      name={element.name}
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[element.name]}
      touched={touched[element.name] as any}
      errorText={errors[element.name] as any}
    />
  );
};
