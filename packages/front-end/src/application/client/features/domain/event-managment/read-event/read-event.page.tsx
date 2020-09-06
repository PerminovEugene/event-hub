import gql from 'graphql-tag';
import * as React from 'react';
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

const EventPage = (props: any) => {
  // const { loading, data, error } = useQuery<{ getEvent: Event }>(GET_EVENTS, {
  //   variables: {
  //     eventIdInput: {},
  //   },
  // });
  const { loading, data, error } = {
    loading: false,
    data: false,
    error: false,
  };

  if (loading) {
    return null;
  }
  // const event = data.getEvent;
  const event: any = {};
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
