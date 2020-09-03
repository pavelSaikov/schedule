import { IHeaderState } from './header.reducer';

export const appModeSelector = (state: IHeaderState) => state.mode;
