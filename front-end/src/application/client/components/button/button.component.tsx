import * as React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';

const StyledButton: React.ComponentType<any> = styled(Button)({
  // EXAMPLE
  // div: {
  //   padding: '10px',
  //   input: { color: 'red', marginTop: '10px' },
  // },
});

export const ThemeButton = (props: ButtonProps) => <StyledButton {...props} />;
