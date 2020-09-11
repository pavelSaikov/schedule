import './calendar-schedule.scss';

import { Calendar, List, Spin } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { IEvent, IEventCategory, RowCategoryName, TimeZone } from '../../../../models/app.models';
import { sortCalendarEvents, ICalendarEvent, IStructuredEvents } from './calendar-schedule.models';

interface ICalendarSchedule {
  events: IEvent[];
  eventCategories: IEventCategory[];
  timeZone: TimeZone;
}

export const CalendarSchedule: FC<ICalendarSchedule> = ({ events, timeZone, eventCategories }) => {
  const [structuredEvents, setStructuredEvents] = useState<IStructuredEvents>();

  useEffect(() => {
    const calendarEvents: ICalendarEvent[] = events
      .map(({ title, dateTime, eventCategoryName, deadlineDate }) => {
        const event: ICalendarEvent = { title, dateTime, eventCategoryName };
        const events: ICalendarEvent[] = [event];

        if (deadlineDate) {
          events.push({ ...event, dateTime: deadlineDate, eventCategoryName: RowCategoryName.deadline });
        }

        return events;
      })
      .flat()
      .sort(sortCalendarEvents);

    const structuredEvents: IStructuredEvents = {};

    calendarEvents.map(e => {
      const eventMoment: Moment = moment(e.dateTime).tz(timeZone);

      const yearString: string = eventMoment.year().toString();
      structuredEvents[yearString] ? null : (structuredEvents[yearString] = {});

      const monthString: string = eventMoment.month().toString();
      structuredEvents[yearString][monthString] ? null : (structuredEvents[yearString][monthString] = {});

      const dateString: string = eventMoment.date().toString();
      structuredEvents[yearString][monthString][dateString]
        ? null
        : (structuredEvents[yearString][monthString][dateString] = []);

      structuredEvents[yearString][monthString][dateString].push({ ...e, dateTime: eventMoment.format() });
    });

    setStructuredEvents(structuredEvents);
  }, [events, timeZone]);

  const renderListItem = useCallback(
    (calendarEvent: ICalendarEvent) => {
      const { backgroundColor, textColor } = eventCategories.find(
        c => c.categoryName === calendarEvent.eventCategoryName,
      );

      return (
        <div
          className="calendar-schedule_list-item"
          style={{
            backgroundColor,
          }}
        >
          <Paragraph ellipsis={{ rows: 1, expandable: true }} strong style={{ color: textColor }}>
            {calendarEvent.title}
          </Paragraph>
        </div>
      );
    },
    [eventCategories],
  );

  const dateCellRender = useCallback(
    (dateTime: Moment) => {
      dateTime.tz(timeZone);
      const year: string = dateTime.year().toString();
      const month: string = dateTime.month().toString();
      const date: string = dateTime.date().toString();

      const calendarEvents: ICalendarEvent[] = !structuredEvents[year]
        ? null
        : !structuredEvents[year][month]
        ? null
        : structuredEvents[year][month][date];

      if (!calendarEvents) {
        return null;
      }

      return <List dataSource={calendarEvents} renderItem={renderListItem} />;
    },
    [renderListItem, structuredEvents, timeZone],
  );

  return (
    <div>
      {structuredEvents && <Calendar dateCellRender={dateCellRender} />}
      {!structuredEvents && <Spin className="calendar-schedule_spinner" size="large" />}
    </div>
  );
};
