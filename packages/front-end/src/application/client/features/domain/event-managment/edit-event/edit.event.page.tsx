import { useQuery } from '@apollo/react-hooks';
import { Event } from '@event-hub/shared';
import gql from 'graphql-tag';
import * as React from 'react';

const GET_EVENTS = gql`
  query getEvent($filtersInput: FiltersInput) {
    getEvents(filtersInput: $filtersInput) {
      id
      type
      name
      description
      date
    }
  }
`;

type Props = {};

const EditEventPage = () => {
  const { loading, data, error } = useQuery<{ getEvents: [Event] }>(GET_EVENTS, {
    variables: {
      filtersInput: {},
    },
  });

  return <div>Edit event page</div>;
};
export default EditEventPage;
