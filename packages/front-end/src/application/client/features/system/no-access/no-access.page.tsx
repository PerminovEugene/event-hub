import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export default class NoAccessPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Wrapper>No access page</Wrapper>
      </div>
    );
  }
}
