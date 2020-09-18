import moment, { Moment } from 'moment';

import { IEventCategory, TimeZone } from '../../../../models/app.models';
import { sortMomentByDate } from '../../main.models';

export interface IListItemInfo {
  title: string;
  description: string;
  dateTime: string;
  organizer: string;
  eventCategory: IEventCategory;
  timeZone: TimeZone;
  id: string;
  isSelected: boolean;
}

export const sortListItemsByDate = (li1: IListItemInfo, li2: IListItemInfo): number => {
  const firstMoment: Moment = moment(li1.dateTime);
  const secondMoment: Moment = moment(li2.dateTime);

  return sortMomentByDate(firstMoment, secondMoment);
};
