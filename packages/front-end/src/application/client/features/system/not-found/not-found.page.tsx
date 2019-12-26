import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export default class NotFoundPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Wrapper>Not found page</Wrapper>
      </div>
    );
  }
}
