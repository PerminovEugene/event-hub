import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';
import { palette } from './../../styles/theme/colors';

const StyledLink: React.ComponentType<any> = styled(Link)`
  white-space: nowrap;
  color: ${palette.primary[600]};
  &:visited {
    color: ${palette.primary[600]};
  }
`;

export const ThemeLink = (props: LinkProps) => <StyledLink {...props} />;
