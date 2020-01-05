import * as React from 'react';
import styled from 'styled-components';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const style = {
  '-webkit-box-shadow': '0 0 0 30px white inset !important;',
};

const StyledTextField: React.ComponentType<any> = styled(TextField)({
  //   // EXAMPLE
  // div: {
  //   input: {
  //   },
  // },
});

type FormInputProps = {
  touched: boolean;
  errorText: string;
};
type TextFieldFormProps = TextFieldProps & FormInputProps;

export const ThemeTextField = (props: TextFieldFormProps) => (
  <StyledTextField
    {...props}
    variant="outlined"
    margin="normal"
    error={props.touched && props.errorText}
    helperText={props.touched ? props.errorText : ''}
  />
);
