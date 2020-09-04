import { ScheduleMode } from '../../../models/app.models';
import { IAction } from '../../../store/index';
import { setScheduleMode } from './main.actions';

export interface IMainState {
  scheduleMode: ScheduleMode;
}

const DEFAULT_STATE: IMainState = {
  scheduleMode: ScheduleMode.table,
};

export const mainReducer = (state: IMainState = DEFAULT_STATE, action: IAction): IMainState => {
  switch (action.type) {
    case setScheduleMode.type:
      return { ...state, scheduleMode: action.payload };
    default:
      return state;
  }
};
