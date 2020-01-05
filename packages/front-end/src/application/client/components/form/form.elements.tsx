import * as React from 'react';
import { ThemeTextField } from '../text-field/text-field.component';
import { FormikProps } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';

export enum ElementView {
  textInput = 'textInput',
}

export interface FormElement {
  type: string;
  label: string;
  name: string;
  view: ElementView;
}

// TODO
interface TextInputProps {
  element: FormElement;
  formProps: FormikProps<any>;
}

export const TextInput = ({ element, handleChange, handleBlur, values, touched, errors }: any) => {
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
