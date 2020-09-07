import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { appModeSelector, timeZoneSelector } from '../../components/header/store/header.selectors';
import { TaskDates } from './components/task-dates/task-dates';

export const DescriptionPage: FC = () => {
  const timeZone = useSelector(timeZoneSelector);
  const appMode = useSelector(appModeSelector);

  const [startDate, setStartDate] = useState('2020-09-10T08:02:17-05:00');
  const [deadlineDate, setDeadlineDate] = useState('2020-09-11T08:02:17-05:00');

  return (
    <div>
      <h1>Description Page</h1>
      <TaskDates
        appMode={appMode}
        timeZone={timeZone}
        startDateTime={startDate}
        deadlineDateTime={deadlineDate}
        onChangeStartDate={(date: string) => {
          console.log('New start date', date);
          setStartDate(date);
        }}
        onChangeDeadlineDate={(date: string) => {
          console.log('New end date', date);
          setDeadlineDate(date);
        }}
      />
    </div>
  );
};
