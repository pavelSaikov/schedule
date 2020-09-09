import { AppMode, TimeZone } from '../../../../models/app.models';
import { IAction } from '../../../../store/index';
import { setAppMode, setTimeZone } from './header.actions';

export interface IHeaderState {
  mode: AppMode;
  timeZone: TimeZone;
}

const DEFAULT_STATE: IHeaderState = {
  mode: AppMode.student,
  timeZone: TimeZone.europeMoscow,
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
