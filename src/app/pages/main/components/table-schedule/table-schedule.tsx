import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  appModeSelector,
  timeZoneSelector,
} from '../../../../common/components/common-header/store/common-header.selectors';
import { AppMode, TimeZone } from '../../../../models/app.models';
import { DateCell } from './components/date-cell/date-cell';
import { TimeCell } from './components/time-cell/time-cell';
import { OrganizerCell } from './components/organizer-cell/organizer-cell';
import { EditDateModal } from './components/edit-date-modal/edit-date-modal';
import { Button } from 'antd';

export const TableSchedule: FC = () => {
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const appMode: AppMode = useSelector(appModeSelector);

  const [isVisible, setIsVisible] = useState(false);

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
      <Button onClick={() => setIsVisible(true)}>Open Modal</Button>
      <EditDateModal
        defaultDateTime={'2020-06-01T23:00:00+03:00'}
        defaultTimeZone={timeZone}
        visible={isVisible}
        onCancelClick={() => setIsVisible(false)}
        onConfirmClick={(date: string) => {
          console.log(date);
          setIsVisible(false);
        }}
      />
    </div>
  );
};
