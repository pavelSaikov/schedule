import { IEvent, RowCategoryName } from '../../../../../../models/app.models';

export interface IModalsState {
  isBroadcastUrlModalOpen: boolean;
  isDateModalOpen: boolean;
  isTimeModalOpen: boolean;
  isEventCategoryModalOpen: boolean;
  isOrganizerModalOpen: boolean;
}

const ONE_HOUR_IN_MILLISECONDS: number = 60 * 60 * 100;

export const checkIsTimeCanBeChanged = (
  event: IEvent,
  newDate: string,
  eventCategoryName: string,
): boolean => {
  const newDateMoment: Date = new Date(newDate);
  const startDate: Date = new Date(event.dateTime);
  const deadlineDate: Date = event.deadlineDate ? new Date(event.deadlineDate) : null;

  if (eventCategoryName === RowCategoryName.deadline) {
    return newDateMoment.getTime() - startDate.getTime() >= ONE_HOUR_IN_MILLISECONDS;
  }

  if (deadlineDate) {
    return deadlineDate.getTime() - newDateMoment.getTime() >= ONE_HOUR_IN_MILLISECONDS;
  }

  return true;
};
