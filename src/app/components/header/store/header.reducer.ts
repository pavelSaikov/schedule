import { AppMode } from '../../../models/app.models';
import { IAction } from '../../../store/index';
import { setAppMode } from './header.actions';

export interface IHeaderState {
  mode: AppMode;
}

const DEFAULT_STATE: IHeaderState = {
  mode: AppMode.student,
};

export const headerReducer = (state: IHeaderState = DEFAULT_STATE, action: IAction) => {
  switch (action.type) {
    case setAppMode.type:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};
