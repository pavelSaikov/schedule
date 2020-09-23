import { IMainState } from './main.reducer';

export const scheduleModeSelector = ({ main }: { main: IMainState }) => main.scheduleMode;
export const checkedColumnsSelector = ({ main }: { main: IMainState }) => main.checkedColumns;
export const checkedEventCategoriesSelector = ({ main }: { main: IMainState }) => main.checkedEventCategories;
