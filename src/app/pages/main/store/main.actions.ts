import { ScheduleMode } from '../../../models/app.models';
import { createAction } from '../../../store/create-action';

export const setScheduleMode = createAction<ScheduleMode>('[App] Set Schedule Mode');
export const setCheckedColumns = createAction<string[]>('[App] Set Checked Table Columns');
export const setCheckedEventCategories = createAction<string[]>('[App] Set Checked Event Categories');
