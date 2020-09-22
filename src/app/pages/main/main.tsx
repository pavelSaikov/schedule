import './main.scss';

import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { timeZoneSelector } from '../../common/components/common-header/store/common-header.selectors';
import { IEvent, IEventCategory, ScheduleMode, TimeZone } from '../../models/app.models';
import { AppRoutes } from '../../routes/routes';
import { eventsSelector, eventCategoriesSelector } from '../../store/app.selectors';
import { CalendarSchedule, ListSchedule, ScheduleNavigation, TableSchedule } from './components';
import { sortEventsByDate, LOCAL_STORAGE_CHECKED_EVENT_CATEGORIES } from './main.models';
import { scheduleModeSelector } from './store/main.selectors';
import { setCheckedEventCategories } from './store/main.actions';

export const MainPage: FC = () => {
  const dispatch = useDispatch();
  const scheduleMode: ScheduleMode = useSelector(scheduleModeSelector);
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const events: IEvent[] = useSelector(eventsSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);

  const history = useHistory();

  const [isEventsStructured, setIsEventsStructured] = useState(false);

  useEffect(() => {
    if (isEventsStructured) {
      return;
    }

    events.sort(sortEventsByDate);
    setIsEventsStructured(true);
  }, [events, isEventsStructured]);

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_CHECKED_EVENT_CATEGORIES) && eventCategories) {
      const eventCategoriesNames: string[] = eventCategories.map(ec => ec.categoryName);

      dispatch(setCheckedEventCategories({ payload: eventCategoriesNames }));
    }
  }, [dispatch, eventCategories]);

  const onMoreClick = useCallback((id: string) => history.push(`/${AppRoutes.description}/${id}`), [history]);

  const scheduleView = useMemo(() => {
    switch (scheduleMode) {
      case ScheduleMode.table:
        return <TableSchedule onMoreClick={onMoreClick} />;
      case ScheduleMode.list:
        return <ListSchedule onMoreClick={onMoreClick} />;
      case ScheduleMode.calendar:
        return <CalendarSchedule events={events} eventCategories={eventCategories} timeZone={timeZone} />;
      default:
        return <TableSchedule onMoreClick={onMoreClick} />;
    }
  }, [eventCategories, events, onMoreClick, scheduleMode, timeZone]);

  return (
    <div className="main_wrapper">
      <ScheduleNavigation />
      {scheduleView}
    </div>
  );
};
