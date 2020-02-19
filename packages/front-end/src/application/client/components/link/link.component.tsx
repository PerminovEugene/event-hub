import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';
import { palette } from './../../styles/theme/colors';
import { ButtonProps } from '@material-ui/core';

const setupTextDecoration = (props: ThemeLinkProps) => props.textDecoration || 'underline';
const setupColor = (props: ThemeLinkProps) => props.customColor || palette.primary[600];
const setupTextTransform = (props: ThemeLinkProps) => (props.uppercase ? 'uppercase' : 'none');

const StyledLink: React.ComponentType<any> = styled(Link)`
  white-space: nowrap;
  text-decoration: ${setupTextDecoration};
  color: ${setupColor};
  text-transform: ${setupTextTransform}
  &:visited {
    color: ${setupColor};
    text-decoration: ${setupTextDecoration};
  };
  }
`;

type ThemeLinkProps = LinkProps &
  ButtonProps & {
    customColor?: string;
    textDecoration?: string;
    uppercase?: boolean;
  };

export const ThemeLink = (props: ThemeLinkProps) => <StyledLink {...props} />;

export const HeaderThemeLink = (props: ThemeLinkProps) => (
  <StyledLink textDecoration="none" customColor="white" uppercase {...props} />
);
