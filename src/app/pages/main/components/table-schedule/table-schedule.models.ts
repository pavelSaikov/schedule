import { IModalsState } from './components/table-modals/table-modals.models';
import moment, { Moment } from 'moment-timezone';

import { IEvent, IEventCategory, RowCategoryName, TimeZone } from '../../../../models/app.models';
import { sortMomentByDate } from '../../main.models';
import { GITHUB_PREFIX } from './components/table-content/components/organizer-cell/organizer-cell.models';

export interface ITableRowInfo {
  key: number;
  id: string;
  eventCategory: IEventCategory;
  title: string;
  comment: string;
  dateTime: string;
  broadcastUrl: string;
  organizer: string;
}

export interface IRowsSortedByWeeks {
  [id: string]: ITableRowInfo[];
}

export interface ISelectedRows {
  [id: string]: string[];
}

export const DEFAULT_MODALS_STATE: IModalsState = {
  isBroadcastUrlModalOpen: false,
  isDateModalOpen: false,
  isEventCategoryModalOpen: false,
  isOrganizerModalOpen: false,
  isTimeModalOpen: false,
};

export const sortTableRowsByDate = (li1: ITableRowInfo, li2: ITableRowInfo): number => {
  const firstMoment: Moment = moment(li1.dateTime);
  const secondMoment: Moment = moment(li2.dateTime);

  return sortMomentByDate(firstMoment, secondMoment);
};

export const prepareTableRowInfo = (events: IEvent[], eventCategories: IEventCategory[]): ITableRowInfo[] =>
  events
    .reduce(
      (
        result,
        { id, title, comment, dateTime, organizer, eventCategoryName, broadcastUrl, deadlineDate },
        key,
        array,
      ) => {
        const events: ITableRowInfo[] = [];

        const baseTableRow: ITableRowInfo = {
          eventCategory: {
            ...eventCategories.find(e => e.categoryName === eventCategoryName),
          },
          key,
          id,
          title,
          comment,
          dateTime,
          organizer: GITHUB_PREFIX + organizer,
          broadcastUrl,
        };
        events.push(baseTableRow);

        if (deadlineDate) {
          const deadlineEvent: ITableRowInfo = {
            ...baseTableRow,
            dateTime: deadlineDate,
            key: array.length + key,
            eventCategory: eventCategories.find(e => e.categoryName === RowCategoryName.deadline),
          };
          events.push(deadlineEvent);
        }

        result.push(events);
        return result;
      },
      [],
    )
    .flat()
    .sort(sortTableRowsByDate);

export const separateByWeeks = (rows: ITableRowInfo[], timeZone: TimeZone): IRowsSortedByWeeks => {
  const weeks = Object.create(null);
  rows.map(row => {
    const date = moment(row.dateTime).tz(timeZone);
    weeks[date.week()] ? weeks[date.week()].push(row) : (weeks[date.week()] = [row]);
  });

  return weeks;
};
