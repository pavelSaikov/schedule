import moment, { Moment } from 'moment';

import { sortMomentByDate } from '../../main.models';

export interface ICalendarEvent {
  eventCategoryName: string;
  title: string;
  dateTime: string;
}

export interface IStructuredEvents {
  [code: string]: {
    [code: string]: {
      [code: string]: ICalendarEvent[];
    };
  };
}

export const sortCalendarEvents = (
  firstCalendarEvent: ICalendarEvent,
  secondCalendarEvent: ICalendarEvent,
): number => {
  const firstMoment: Moment = moment(firstCalendarEvent.dateTime);
  const secondMoment: Moment = moment(secondCalendarEvent.dateTime);

  return sortMomentByDate(firstMoment, secondMoment);
};
