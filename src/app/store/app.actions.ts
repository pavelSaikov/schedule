import { IEvent, IEventCategory } from '../models/app.models';
import { createAction } from './create-action';

export const setEventCategories = createAction<IEventCategory[]>('[App] Set Event Categories');
export const setEvents = createAction<IEvent[]>('[App] Set Events');
