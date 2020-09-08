import { IEvent, IEventCategory } from '../models/app.models';
import { setEventCategories, setEvents } from './app.actions';
import { IAction } from './index';

export interface IAppState {
  eventCategories: IEventCategory[];
  events: IEvent[];
}

const DEFAULT_STATE: IAppState = { eventCategories: [], events: [] };

export const appReducer = (state: IAppState = DEFAULT_STATE, action: IAction): IAppState => {
  switch (action.type) {
    case setEventCategories.type:
      return { ...state, eventCategories: action.payload };
    case setEvents.type:
      return { ...state, events: action.payload };
    default:
      return state;
  }
};
