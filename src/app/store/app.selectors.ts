import { IAppState } from './app.reducer';

export const eventCategoriesSelector = ({ app }: { app: IAppState }) => app.eventCategories;
