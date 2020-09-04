import { ScheduleMode } from '../../../models/app.models';
import { createAction } from '../../../store/create-action';

export const setScheduleMode = createAction<ScheduleMode>('[App] Set Schedule Mode');
