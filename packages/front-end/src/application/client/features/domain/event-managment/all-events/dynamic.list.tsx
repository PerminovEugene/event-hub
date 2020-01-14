import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Event } from '@calendar/shared';
import { generateNodeKey } from '../../../../../../framework/generators/string-generator';

const GET_EVENTS = gql`
  query getEvents($filtersInput: FiltersInput) {
    getEvents(filtersInput: $filtersInput) {
      id
      type
      name
      description
      date
    }
  }
`;

const EventItem = ({ id, type, name, description, date }: any) => (
  <li>
    <h3>{type}</h3>
    <h2>{name}</h2>
    <p>{date}</p>
    <p>{description}</p>
  </li>
);

const EventsList = () => {
  const { loading, data, error } = useQuery<{ getEvents: [Event] }>(GET_EVENTS, {
    variables: {
      filtersInput: {},
    },
  });

  return loading ? null : (
    <ul>
      {data.getEvents.map((event: Event) => (
        <EventItem key={generateNodeKey(`event-item-${event.id}`)} {...event} />
      ))}
    </ul>
  );
};
export default EventsList;
