import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import schema from './validation.schema';
import { FormWrapper, FormActions } from './../../../../components/form/form.wrapper';
import { ElementView, FormElement } from './../../../../components/form/form.elements';
import { LoginInput, SessionData, EventInput } from '@calendar/shared';
import { getServerErrorData } from '../../../../../../framework/helpers/graphql.helper';

type Props = {};

const CREATE_EVENT = gql`
  mutation createEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      id
      name
      description
      type
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
  date: '21/05/2020',
};

const CreateEventPage = ({ history }: Partial<RouteComponentProps>) => {
  const [createEvent] = useMutation<{ createEvent: Event }>(CREATE_EVENT);
  const client = useApolloClient();
  return (
    <FormWrapper
      validationSchema={schema}
      initialValues={initialValues}
      elements={config}
      submitText="Create event" // TODO i18n'
      onSubmit={async (values: EventInput, actions: FormActions<EventInput>) => {
        try {
          const result = await createEvent({
            variables: {
              eventInput: values,
            },
          });
          // client.writeData({
          //   data: createMe(result.data.login),
          // });
          actions.setStatus(null);
          history.push('/');
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
