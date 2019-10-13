import * as React from 'react';
import { ThemeTextField } from '../components/text-field/text-field.component';
import styled from 'styled-components';

const Wrapper: React.ComponentType<any> = styled.section`
  padding: 10px;
  background-color: blue;
`;

export default class Registration extends React.Component<{}, {}> {
  render() {
    return (
      <Wrapper>
        БОМЖИ
        <ThemeTextField label="Email" autoFocus />
        <ThemeTextField label="Password" type="password" />
        <ThemeTextField label="Password repeat" type="password" />
      </Wrapper>
    );
  }
}
