import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { EventFilters } from '@calendar/shared';
import { getEnvManager } from '../../../../../../framework/configuration/environment-manger-keeper';

const GET_EVENTS = gql`
  query getEvents($filtersInput: FiltersInput) {
    events(filtersInput: $filtersInput) {
      id
      type
      name
      description
      date
    }
  }
`;

type Props = {};

const EventsList = () => {
  const { loading, data, error } = useQuery<{ getEvents: EventFilters }>(GET_EVENTS, { variables: {} });
  console.log('loading: ', loading, 'data: ', data);
  return <div>All events</div>;
};
export default EventsList;
