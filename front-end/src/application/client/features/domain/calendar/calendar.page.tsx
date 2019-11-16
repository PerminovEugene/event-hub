import * as React from 'react';
import Calendar from '../../../components/calendar/calendar.component';

type Props = {};

export default class Root extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <Calendar />
      </div>
    );
  }
}
