import { LOCAL_STORAGE_CHECKED_EVENT_CATEGORIES } from './../main.models';
import { ScheduleMode } from '../../../models/app.models';
import { IAction } from '../../../store/index';
import { COLUMN_TITLES } from '../components/table-schedule/components/table-content/table-content.models';
import { LOCAL_STORAGE_CHECKED_COLUMNS, LOCAL_STORAGE_SCHEDULE_MODE } from '../main.models';
import { setCheckedColumns, setScheduleMode, setCheckedEventCategories } from './main.actions';

export interface IMainState {
  scheduleMode: ScheduleMode;
  checkedColumns: string[];
  checkedEventCategories: string[];
}

const DEFAULT_STATE: IMainState = {
  scheduleMode: localStorage.getItem(LOCAL_STORAGE_SCHEDULE_MODE)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCHEDULE_MODE))
    : ScheduleMode.table,
  checkedColumns: localStorage.getItem(LOCAL_STORAGE_CHECKED_COLUMNS)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CHECKED_COLUMNS))
    : COLUMN_TITLES,
  checkedEventCategories: localStorage.getItem(LOCAL_STORAGE_CHECKED_EVENT_CATEGORIES)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CHECKED_EVENT_CATEGORIES))
    : [],
};

export const mainReducer = (state: IMainState = DEFAULT_STATE, action: IAction): IMainState => {
  switch (action.type) {
    case setScheduleMode.type:
      return { ...state, scheduleMode: action.payload };
    case setCheckedColumns.type:
      return { ...state, checkedColumns: action.payload };
    case setCheckedEventCategories.type: {
      return { ...state, checkedEventCategories: action.payload };
    }
    default:
      return state;
  }
};
