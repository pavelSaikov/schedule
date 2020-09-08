import { IEvent, IEventCategory } from '../models/app.models';
import { backendService } from '../services/backend/backend-service';
import { setEvents, setEventCategories } from './app.actions';

export const loadData = (
  abortController: AbortController,
  setIsLoadCompleted: (isCompleted: boolean) => void,
) => dispatch => {
  backendService
    .getAllEventCategories(abortController)
    .then((eventCategories: IEventCategory[]) =>
      Promise.all([Promise.resolve(eventCategories), backendService.getAllEvents(abortController)]),
    )
    .then(([eventCategories, events]: [IEventCategory[], IEvent[]]) => {
      dispatch(setEventCategories({ payload: eventCategories }));
      dispatch(setEvents({ payload: events }));
      setIsLoadCompleted(true);
    });
};
