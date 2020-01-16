import * as React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

class NotFoundPage extends React.Component<WithTranslation, {}> {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Wrapper>{t('pages.notFound.title')}</Wrapper>
      </div>
    );
  }
}
export default withTranslation()(NotFoundPage);
