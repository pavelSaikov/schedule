import './main.scss';

import React, { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';

import { ScheduleMode } from '../../models/app.models';
import { CalendarSchedule } from './components/calendar-schedule/calendar-schedule';
import { ListSchedule } from './components/list-schedule/list-schedule';
import { ScheduleNavigation } from './components/schedule-navigation/schedule-navigation';
import { TableSchedule } from './components/table-schedule/table-schedule';
import { scheduleModeSelector } from './store/main.selectors';

export const MainPage: FC = () => {
  const scheduleMode = useSelector(scheduleModeSelector);

  const scheduleView = useMemo(() => {
    switch (scheduleMode) {
      case ScheduleMode.table:
        return <TableSchedule />;
      case ScheduleMode.list:
        return <ListSchedule />;
      case ScheduleMode.calendar:
        return <CalendarSchedule />;
    }
  }, [scheduleMode]);

  return (
    <div className="main_wrapper">
      <ScheduleNavigation />
      {scheduleView}
    </div>
  );
};
