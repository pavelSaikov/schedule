import { AppMode, TimeZone } from '../../../../models/app.models';
import { IHeaderState } from './common-header.reducer';

export const appModeSelector = ({ header }: { header: IHeaderState }): AppMode => header.mode;
export const timeZoneSelector = ({ header }: { header: IHeaderState }): TimeZone => header.timeZone;
