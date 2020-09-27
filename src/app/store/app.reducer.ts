import cloneDeep from 'lodash.clonedeep';

import { IEvent, IEventCategory } from '../models/app.models';
import { setEvents, setEventCategories, updateEvent } from './app.actions';
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
    case updateEvent.type:
      const eventsCopy = [...state.events];
      const indexOfUpdatedEvent = eventsCopy.findIndex(e => e.id === action.payload.id);
      eventsCopy.splice(indexOfUpdatedEvent, 1, cloneDeep(action.payload));
      return { ...state, events: eventsCopy };
    default:
      return state;
  }
};
