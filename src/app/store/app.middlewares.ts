import {
  LOCAL_STORAGE_APP_MODE,
  LOCAL_STORAGE_TIMEZONE,
} from '../common/components/common-header/common-header.models';
import { setAppMode, setTimeZone } from '../common/components/common-header/store/common-header.actions';
import {
  LOCAL_STORAGE_CHECKED_COLUMNS,
  LOCAL_STORAGE_CHECKED_EVENT_CATEGORIES,
  LOCAL_STORAGE_SCHEDULE_MODE,
} from '../pages/main/main.models';
import {
  setCheckedColumns,
  setCheckedEventCategories,
  setScheduleMode,
} from '../pages/main/store/main.actions';

export const localStorageMiddleWare = () => next => action => {
  if (action.type === setCheckedColumns.type) {
    localStorage.setItem(LOCAL_STORAGE_CHECKED_COLUMNS, JSON.stringify([...action.payload]));
  }

  if (action.type === setTimeZone.type) {
    localStorage.setItem(LOCAL_STORAGE_TIMEZONE, JSON.stringify(action.payload));
  }

  if (action.type === setScheduleMode.type) {
    localStorage.setItem(LOCAL_STORAGE_SCHEDULE_MODE, JSON.stringify(action.payload));
  }

  if (action.type === setAppMode.type) {
    localStorage.setItem(LOCAL_STORAGE_APP_MODE, JSON.stringify(action.payload));
  }

  if (action.type === setCheckedEventCategories.type) {
    localStorage.setItem(LOCAL_STORAGE_CHECKED_EVENT_CATEGORIES, JSON.stringify([...action.payload]));
  }

  return next(action);
};
