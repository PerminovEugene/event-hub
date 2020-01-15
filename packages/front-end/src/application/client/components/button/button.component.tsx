import * as React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';

const StyledButton: React.ComponentType<any> = styled(Button)`
  & .MuiButton-label {
    color: white;
  }
`;

type StyledButtonProps = ButtonProps & {
  customColor?: string;
};

export const ThemeButton = (props: StyledButtonProps) => <StyledButton {...props} />;
