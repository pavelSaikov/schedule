import { AppMode, TimeZone } from '../../../../models/app.models';
import { createAction } from '../../../../store/create-action';

export const setAppMode = createAction<AppMode>('[App] Set App Mode');
export const setTimeZone = createAction<TimeZone>('[App] Set Time Zone');
