import React, { FC } from 'react';

import { DateCell } from './components/date-cell/date-cell';
import { TimeCell } from './components/time-cell/time-cell';

export const TableSchedule: FC = () => {
  return (
    <div>
      <h1>Table Schedule</h1>
      <TimeCell
        dateTime={'2020-06-01T20:00:00+03:00'}
        onEditClick={() => {
          return;
        }}
      />
      <DateCell
        dateTime={'2020-06-01T20:00:00+03:00'}
        onEditClick={() => {
          return;
        }}
      />
    </div>
  );
};
