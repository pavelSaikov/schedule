import { Table } from 'antd';
import React, { useCallback, FC } from 'react';

import { AppMode, IEventCategory, TimeZone } from '../../../../../../models/app.models';
import { ITableRowInfo } from '../../table-schedule.models';
import { BroadcastURLCell } from '../broadcast-url-cell/broadcast-url-cell';
import { DateCell } from '../date-cell/date-cell';
import { EventCategoryCell, TimeCell } from '../index';
import { NameCell } from '../name-cell/name-cell';
import { OrganizerCell } from '../organizer-cell/organizer-cell';
import { rowSelection } from './table.models';

interface ITableContent {
  rowsContent: ITableRowInfo[];
  appMode: AppMode;
  timeZone: TimeZone;
  onChange: (newRowContent: ITableRowInfo) => void;
  onSelect: () => void;
  onSelectAll: () => void;
  onTitleEdit: (id: string, title: string) => void;
  onTimeEdit: (id: string, eventCategoryName: string) => void;
  onDateEdit: (id: string, eventCategoryName: string) => void;
  onCategoryEdit: (id: string) => void;
  onOrganizerEdit: (id: string) => void;
  onCommentEdit: (id: string) => void;
  onBroadcastUrlEdit: (id: string) => void;
}

export const TableContent: FC<ITableContent> = ({
  rowsContent,
  appMode,
  timeZone,
  onChange,
  onSelectAll,
  onSelect,
  onTitleEdit,
  onDateEdit,
  onTimeEdit,
  onOrganizerEdit,
  onCategoryEdit,
  onCommentEdit,
  onBroadcastUrlEdit,
}) => {
  const onNameEdit = useCallback((id: string, newValue: string) => {
    console.log(`${id}:${newValue}`);
  }, []);

  const columns = [
    {
      title: 'Event type',
      dataIndex: 'eventCategory',
      className: 'hide',
      render: (eventCategory: IEventCategory, record: ITableRowInfo) => (
        <EventCategoryCell
          appMode={appMode}
          eventCategory={eventCategory}
          onEditClick={() => onCategoryEdit(record.id)}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text: string, record: ITableRowInfo) => (
        <NameCell
          name={text}
          appMode={appMode}
          onEditClick={(title: string) => onTitleEdit(record.id, title)}
        />
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Date',
      dataIndex: 'dateTime',
      render: (text: string, record: ITableRowInfo) => (
        <DateCell
          appMode={appMode}
          onEditClick={() => onDateEdit(record.id, record.eventCategory.categoryName)}
          dateTime={text}
          timeZone={timeZone}
        />
      ),
    },
    {
      title: 'Time',
      dataIndex: 'dateTime',
      visible: false,
      render: (text: string, record: ITableRowInfo) => (
        <TimeCell
          appMode={appMode}
          onEditClick={() => onTimeEdit(record.id, record.eventCategory.categoryName)}
          dateTime={text}
          timeZone={timeZone}
        />
      ),
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      render: (text: string, record: ITableRowInfo) => (
        <OrganizerCell appMode={appMode} gitLink={text} onEditClick={() => onOrganizerEdit(record.id)} />
      ),
    },
    {
      title: 'BroadcastUrl',
      dataIndex: 'broadcastUrl',
      render: (url: string, record: ITableRowInfo) => (
        <BroadcastURLCell appMode={appMode} link={url} onEditClick={() => onBroadcastUrlEdit(record.id)} />
      ),
    },
  ];

  return (
    <Table
      rowSelection={{
        ...rowSelection,
      }}
      rowKey={(record: ITableRowInfo) => record.id + record.eventCategory.categoryName}
      columns={columns}
      dataSource={rowsContent}
      pagination={false}
    />
  );
};
