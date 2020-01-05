import * as React from 'react';
import { ThemeTextField } from '../text-field/text-field.component';
import { FormikProps } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';

export enum ElementView {
  textInput = 'textInput',
}

export interface FormElement {
  label: string;
  view: ElementView;
  attributes: {
    name: string;
    type: string;
    autocomplete?: 'on' | 'off';
  };
}

// TODO
interface TextInputProps {
  element: FormElement;
  handleChange: any;
  handleBlur: any;
  values: any;
  touched: any;
  errors: any;
  // formProps: FormikProps<any>;
}

export const TextInput = ({ element, handleChange, handleBlur, values, touched, errors }: TextInputProps) => {
  return (
    <ThemeTextField
      label={element.label}
      name={element.attributes.name}
      type={element.attributes.type}
      autoComplete={element.attributes.autocomplete || 'on'}
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[element.attributes.name]}
      touched={touched[element.attributes.name] as any}
      errorText={errors[element.attributes.name] as any}
    />
  );
};

const MyButton = withStyles({
  root: {
    error: {
      textAlign: 'center',
      marginBottom: '10px',
    },
  },
})(FormHelperText);

export function StyledBaseError({ error }: { error: string }) {
  return <MyButton error>{error}</MyButton>;
}
