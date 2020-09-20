import cloneDeep from 'lodash.clonedeep';

import { IEvent } from '../../../models/app.models';
import { backendService } from '../../../services/backend/backend-service';
import { updateEvent } from '../../../store/app.actions';

export const uploadUpdatedEvent = (event: IEvent, abortController: AbortController) => dispatch => {
  dispatch(updateEvent({ payload: cloneDeep(event) }));
  backendService.updateEvent(cloneDeep(event), abortController);
};
