import * as React from 'react';
import styled from 'styled-components';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const StyledTextField: React.ComponentType<any> = styled(TextField)({
  //   // EXAMPLE
  //   div: {
  //     padding: '10px',
  //     // input: { color: 'red', marginTop: '10px' },
  //   },
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
