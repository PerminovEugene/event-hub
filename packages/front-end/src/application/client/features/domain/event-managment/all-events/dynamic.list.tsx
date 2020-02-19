import { useQuery } from '@apollo/react-hooks';
import { Event, Tag } from '@event-hub/shared';
import gql from 'graphql-tag';
import * as React from 'react';
import { generateNodeKey } from '../../../../../../framework/generators/string-generator';

const GET_EVENTS = gql`
  query getEvents($eventsFiltersInput: EventsFiltersInput) {
    events(eventsFiltersInput: $eventsFiltersInput) {
      id
      type
      name
      description
      date
      tags {
        id
        name
      }
    }
  }
`;

const EventItem = ({ id, type, name, description, date, tags }: any) => (
  <li>
    <h3>{type}</h3>
    <h2>{name}</h2>
    <p>{date}</p>
    <p>{description}</p>
    <ul>
      {tags.map((tag: Tag) => (
        <li key={generateNodeKey(`event-tag-${tag.id}`)}>{tag.name}</li>
      ))}
    </ul>
  </li>
);

const EventsList = () => {
  const { loading, data, error } = useQuery<{ events: [Event] }>(GET_EVENTS, {
    variables: {
      eventsFiltersInput: {},
    },
  });

  console.log(error, data);

  return loading ? null : (
    <ul>
      {data.events.map((event: Event) => (
        <EventItem key={generateNodeKey(`event-item-${event.id}`)} {...event} />
      ))}
    </ul>
  );
};
export default EventsList;
