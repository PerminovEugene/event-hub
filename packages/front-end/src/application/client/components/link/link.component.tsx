import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkProps, withRouter } from 'react-router-dom';
import { palette } from './../../styles/theme/colors';
import { ButtonProps } from '@material-ui/core';

const StyledLink: React.ComponentType<any> = styled(Link)`
  white-space: nowrap;
  color: ${palette.primary[600]};
  &:visited {
    color: ${palette.primary[600]};
  }
`;

type ThemeLinkProps = LinkProps & ButtonProps;

export const ThemeLink = (props: ThemeLinkProps) => <StyledLink {...props} />;
