import * as React from 'react';
import styled from 'styled-components';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const StyledTextField: React.ComponentType<any> = styled(TextField)({
  // div: {
  //   padding: '10px',
  //   input: { color: 'red', marginTop: '10px' },
  // },
});

export const ThemeTextField = (props: TextFieldProps) => <StyledTextField {...props} />;
