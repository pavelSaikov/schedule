import { IEventCategory } from '../../../../models/app.models';
import { backendService } from '../../../../services';
import { setEventCategories } from '../../../../store/app.actions';

export const uploadEventCategories = (
  eventCategories: IEventCategory[],
  abortController: AbortController,
) => dispatch => {
  Promise.all(
    eventCategories.map(eventCategory => {
      eventCategory.id
        ? backendService.updateEventCategory(eventCategory, abortController)
        : backendService.addEventCategory(eventCategory, abortController);
    }),
  ).then(() => dispatch(setEventCategories({ payload: eventCategories })));
};
