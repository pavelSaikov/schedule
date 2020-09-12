import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  appModeSelector,
  timeZoneSelector,
} from '../../../../common/components/common-header/store/common-header.selectors';
import { AppMode, TimeZone } from '../../../../models/app.models';
import { DateCell } from './components/date-cell/date-cell';
import { TimeCell } from './components/time-cell/time-cell';
import { OrganizerCell } from './components/organizer-cell/organizer-cell';

export const TableSchedule: FC = () => {
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const appMode: AppMode = useSelector(appModeSelector);

  return (
    <div>
      <h1>Table Schedule</h1>
      <TimeCell
        dateTime={'2020-06-01T20:00:00+03:00'}
        onEditClick={() => {
          return;
        }}
        timeZone={timeZone}
        appMode={appMode}
      />
      <DateCell
        dateTime={'2020-06-01T20:00:00+03:00'}
        onEditClick={() => {
          return;
        }}
        timeZone={timeZone}
        appMode={appMode}
      />
      <OrganizerCell
        gitLink={'https://github.com/YuriySga'}
        appMode={appMode}
        onEditClick={() => {
          return;
        }}
      />
    </div>
  );
};
