import cloneDeep from 'lodash.clonedeep';

import { IEvent } from '../../../models/app.models';
import { backendService } from '../../../services/backend/backend-service';
import { updateEvent } from '../../../store/app.actions';

export const uploadUpdatedEvent = (event: IEvent, abortController: AbortController) => dispatch => {
  backendService
    .updateEvent(cloneDeep(event), abortController)
    .then(() => dispatch(updateEvent({ payload: cloneDeep(event) })));
};
