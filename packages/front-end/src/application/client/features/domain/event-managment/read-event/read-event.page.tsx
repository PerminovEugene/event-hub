import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Event } from '@calendar/shared';
import { withRouter } from 'react-router';

const GET_EVENTS = gql`
  query getEvent($eventIdInput: EventIdInput) {
    getEvent(eventIdInput: $eventIdInput) {
      id
      type
      name
      description
      date
    }
  }
`;

type Props = {};

const EventPage = (props: any) => {
  console.log(props);
  const { loading, data, error } = useQuery<{ getEvent: Event }>(GET_EVENTS, {
    variables: {
      eventIdInput: {},
    },
  });
  if (loading) {
    return null;
  }
  const event = data.getEvent;
  return (
    <div>
      <h2>{event.name}</h2>
      <span>{event.type}</span>
      <p>{event.description}</p>
      <span>{event.date}</span>
    </div>
  );
};
export default withRouter(EventPage);
