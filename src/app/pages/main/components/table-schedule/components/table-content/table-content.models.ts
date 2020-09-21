import { ReactText } from 'react';

import { ITableRowInfo } from '../../table-schedule.models';

export const COLUMN_TITLE = {
  EventType: 'Event Type',
  Title: 'Title',
  Comment: 'Comment',
  Date: 'Date',
  Time: 'Time',
  Organizer: 'Organizer',
  BroadcastUrl: 'Broadcast Url',
  Action: 'Action',
};

export const COLUMN_TITLES = Object.values(COLUMN_TITLE);

export const rowSelection = {
  onChange: (selectedRowKeys: ReactText[], selectedRows: ITableRowInfo[]): void => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
