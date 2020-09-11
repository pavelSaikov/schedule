import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import { headerReducer } from '../common/components/common-header/store/common-header.reducer';
import { mainReducer } from '../pages/main/store/main.reducer';
import { appReducer } from './app.reducer';

export interface IAction {
  type: string;
  payload: any;
}

export interface IActionPayload<T> {
  payload: T;
}

export const store = createStore(
  combineReducers({ header: headerReducer, main: mainReducer, app: appReducer }),
  composeWithDevTools(applyMiddleware(thunk)),
);
