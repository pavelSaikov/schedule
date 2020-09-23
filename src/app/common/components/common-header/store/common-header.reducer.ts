import { AppMode, TimeZone } from '../../../../models/app.models';
import { IAction } from '../../../../store/index';
import { LOCAL_STORAGE_APP_MODE, LOCAL_STORAGE_TIMEZONE } from '../common-header.models';
import { setAppMode, setTimeZone } from './common-header.actions';

export interface IHeaderState {
  mode: AppMode;
  timeZone: TimeZone;
}

const DEFAULT_STATE: IHeaderState = {
  mode: localStorage.getItem(LOCAL_STORAGE_APP_MODE)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_MODE))
    : AppMode.student,
  timeZone: localStorage.getItem(LOCAL_STORAGE_TIMEZONE)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_TIMEZONE))
    : TimeZone.europeMoscow,
};

export const headerReducer = (state: IHeaderState = DEFAULT_STATE, action: IAction): IHeaderState => {
  switch (action.type) {
    case setAppMode.type:
      return { ...state, mode: action.payload };
    case setTimeZone.type:
      return { ...state, timeZone: action.payload };

    default:
      return state;
  }
};
