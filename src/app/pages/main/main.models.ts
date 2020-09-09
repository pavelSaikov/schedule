import moment, { Moment } from 'moment';

import { IEvent } from '../../models/app.models';

export const sortEventsByDate = (firstEvent: IEvent, secondEvent: IEvent): number => {
  const firstMoment: Moment = moment(firstEvent.dateTime);
  const secondMoment: Moment = moment(secondEvent.dateTime);

  return sortMomentByDate(firstMoment, secondMoment);
};

export const sortMomentByDate = (firstMoment: Moment, secondMoment: Moment): number => {
  if (firstMoment.year() !== secondMoment.year()) {
    return firstMoment.year() - secondMoment.year();
  }

  if (firstMoment.month() !== secondMoment.month()) {
    return firstMoment.month() - secondMoment.month();
  }

  if (firstMoment.date() !== secondMoment.date()) {
    return firstMoment.date() - secondMoment.date();
  }

  if (firstMoment.hour() !== secondMoment.hour()) {
    return firstMoment.hour() - secondMoment.hour();
  }

  return firstMoment.minute() - secondMoment.minute();
};
