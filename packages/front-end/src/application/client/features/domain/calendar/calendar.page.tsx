import * as React from 'react';
import Calendar from '../../../components/calendar/calendar.component';
import Dashboard from './../../../layout/dashboard/dashboard.component';

type Props = {};

const Root = () => {
  return (
    <Dashboard>
      <Calendar />
    </Dashboard>
  );
};
export default Root;
