import { useMutation } from '@apollo/react-hooks';
import { Event } from '@event-hub/shared';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';


const CreateEventPage = ({ history }: Partial<RouteComponentProps>) => {
  return (
    <canvas />
  );
};

export default withRouter(CreateEventPage);
