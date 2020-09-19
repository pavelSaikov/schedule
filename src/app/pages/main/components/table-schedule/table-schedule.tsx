import React, { useCallback, useEffect, useState, FC } from 'react';
import { useSelector } from 'react-redux';

import {
  appModeSelector,
  timeZoneSelector,
} from '../../../../common/components/common-header/store/common-header.selectors';
import { AppMode, IEvent, IEventCategory, ITableRowInfo, TimeZone } from '../../../../models/app.models';
import { eventsSelector, eventCategoriesSelector } from '../../../../store/app.selectors';
import { TableContent } from './components/table-content/table';
import { DateCell } from './components/date-cell/date-cell';
import { TimeCell } from './components/time-cell/time-cell';
import { OrganizerCell } from './components/organizer-cell/organizer-cell';
import { EditTimeModal } from './components/edit-time-modal/edit-time-modal';
import { EditDateModal } from './components/edit-date-modal/edit-date-modal';

export const TableSchedule: FC = () => {
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const appMode: AppMode = useSelector(appModeSelector);
  const events: IEvent[] = useSelector(eventsSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);

  const [rowsContent, setRowsContent] = useState<ITableRowInfo[]>();
  const [isTimeVisible, setTimeVisibility] = useState<boolean>(false);
  const [isDateVisible, setDateVisibility] = useState<boolean>(false);

  useEffect(() => {
    let index = 0;
    const rowsContent: ITableRowInfo[] = events.map(
      ({ id, title, comment, dateTime, organizer, eventCategoryName, broadcastUrl }) => {
        const eventCategory: IEventCategory = {
          ...eventCategories.find(e => e.categoryName === eventCategoryName),
        };
        return { eventCategory, key: ++index, id, title, comment, dateTime, organizer, broadcastUrl };
      },
    );

    setRowsContent(rowsContent);
  }, [eventCategories, events]);

  const onChange = useCallback((n: ITableRowInfo) => console.log(n), []);

  return (
    <div>
      <h1>Table Schedule</h1>
      {rowsContent && (
        <TableContent
          rowsContent={rowsContent}
          appMode={appMode}
          timeZone={timeZone}
          onChange={onChange}
          onSelect={() => {}}
          onSelectAll={() => {}}
          onTimeEdit={() => {
            console.log('edit dateTime');
          }}
          onDateEdit={() => {
            console.log('edit dateTime');
          }}
          onOrganizerEdit={() => {
            console.log('organizer edit');
          }}
          onCommentEdit={() => {
            console.log(`comment edit`);
          }}
          onBroadcastUrlEdit={() => {
            console.log('broadcastUrl edit');
          }}
        />
      )}
      <TimeCell
        dateTime={'2020-06-01T20:00:00+03:00'}
        onEditClick={() => {
          setTimeVisibility(!isTimeVisible);
        }}
        timeZone={timeZone}
        appMode={appMode}
      />
      <DateCell
        dateTime={'2020-06-01T20:00:00+03:00'}
        onEditClick={() => {
          setDateVisibility(!isDateVisible);
        }}
        timeZone={timeZone}
        appMode={appMode}
      />
      <OrganizerCell
        gitLink={'https://github.com/YuriySga'}
        appMode={appMode}
        onEditClick={() => {
          return;
        }}
      />
      <EditTimeModal
        defaultDateTime={'2020-06-01T20:00:00+03:00'}
        visible={isTimeVisible}
        onConfirmClick={(newDateTime: string) => {
          console.log(newDateTime);
          setTimeVisibility(!isTimeVisible);
        }}
        onCancelClick={() => {
          setTimeVisibility(!isTimeVisible);
        }}
        defaultTimeZone={timeZone}
      />
      <EditDateModal
        defaultDateTime={'2020-06-01T20:00:00+03:00'}
        visible={isDateVisible}
        onConfirmClick={(newDateTime: string) => {
          console.log(newDateTime);
          setDateVisibility(!isDateVisible);
        }}
        onCancelClick={() => {
          setDateVisibility(!isDateVisible);
        }}
        defaultTimeZone={timeZone}
      />
    </div>
  );
};
