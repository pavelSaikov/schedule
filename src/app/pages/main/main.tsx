import './main.scss';

import React, { useEffect, useMemo, useState, FC } from 'react';
import { useSelector } from 'react-redux';

import { timeZoneSelector } from '../../common/components/common-header/store/common-header.selectors';
import { IEvent, IEventCategory, ScheduleMode, TimeZone } from '../../models/app.models';
import { eventsSelector, eventCategoriesSelector } from '../../store/app.selectors';
import { CalendarSchedule, ListSchedule, ScheduleNavigation, TableSchedule } from './components';
import { sortEventsByDate } from './main.models';
import { scheduleModeSelector } from './store/main.selectors';

export const MainPage: FC = () => {
  const scheduleMode: ScheduleMode = useSelector(scheduleModeSelector);
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const events: IEvent[] = useSelector(eventsSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);

  const [isEventsStructured, setIsEventsStructured] = useState(false);

  useEffect(() => {
    if (isEventsStructured) {
      return;
    }

    events.sort(sortEventsByDate);
    setIsEventsStructured(true);
  }, [events, isEventsStructured]);

  const scheduleView = useMemo(() => {
    switch (scheduleMode) {
      case ScheduleMode.table:
        return <TableSchedule />;
      case ScheduleMode.list:
        return (
          <ListSchedule
            events={events}
            eventCategories={eventCategories}
            timeZone={timeZone}
            onMoreClick={(id: string) => console.log('id:', id)}
          />
        );
      case ScheduleMode.calendar:
        return <CalendarSchedule events={events} eventCategories={eventCategories} timeZone={timeZone} />;
      default:
        return <TableSchedule />;
    }
  }, [eventCategories, events, scheduleMode, timeZone]);

  return (
    <div className="main_wrapper">
      <ScheduleNavigation />
      {scheduleView}
    </div>
  );
};
