import { IMainState } from './main.reducer';

export const scheduleModeSelector = ({ main }: { main: IMainState }) => main.scheduleMode;
