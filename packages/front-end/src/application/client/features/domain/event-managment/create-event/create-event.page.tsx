import { useMutation } from '@apollo/react-hooks';
import { Event, EventInput } from '@event-hub/shared';
import gql from 'graphql-tag';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { getServerErrorData } from '../../../../../../framework/helpers/graphql.helper';
import { buildEventPath, PagePath } from '../../../../navigation/pathes';
import { ElementView, FormElement } from './../../../../components/form/form.elements';
import { FormActions, FormWrapper } from './../../../../components/form/form.wrapper';
import schema from './validation.schema';

const CREATE_EVENT = gql`
  mutation createEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      id
    }
  }
`;

const config: Array<FormElement> = [
  {
    label: 'Name',
    view: ElementView.textInput,
    attributes: {
      type: 'text',
      name: 'name',
      autocomplete: 'off',
    },
  },
  {
    label: 'Description',
    view: ElementView.textInput,
    attributes: {
      type: 'text',
      name: 'description',
      autocomplete: 'off',
    },
  },
  {
    label: 'Type',
    view: ElementView.textInput,
    attributes: {
      type: 'text',
      name: 'type',
      autocomplete: 'off',
    },
  },
  {
    label: 'Date',
    view: ElementView.textInput,
    attributes: {
      type: 'text',
      name: 'date',
      autocomplete: 'off',
    },
  },
];

const initialValues: EventInput = {
  name: undefined,
  description: undefined,
  type: 'meetup',
  date: '05.21.2020',
};

const CreateEventPage = ({ history }: Partial<RouteComponentProps>) => {
  const [createEvent] = useMutation<{ createEvent: Event }>(CREATE_EVENT);
  const [t] = useTranslation('translations');
  return (
    <FormWrapper
      validationSchema={schema}
      initialValues={initialValues}
      elements={config}
      submitText={t('pages.createEvent.submit')}
      onSubmit={async (values: EventInput, actions: FormActions<EventInput>) => {
        try {
          const result = await createEvent({
            variables: {
              eventInput: values,
            },
          });
          actions.setStatus(null);
          history.push(buildEventPath(PagePath.event, result.data.createEvent.id));
        } catch (e) {
          actions.setStatus(getServerErrorData(e));
        } finally {
          actions.setSubmitting(false);
        }
      }}
    />
  );
};

export default withRouter(CreateEventPage);
