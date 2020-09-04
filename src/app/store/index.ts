import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { headerReducer } from '../components/header/store/header.reducer';
import { mainReducer } from '../pages/main/store/main.reducer';

export interface IAction {
  type: string;
  payload: any;
}

export interface IActionPayload<T> {
  payload: T;
}

export const store = createStore(combineReducers({ header: headerReducer, main: mainReducer }), composeWithDevTools());
