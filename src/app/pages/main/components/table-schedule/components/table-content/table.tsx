import React, { FC, useCallback } from 'react';
import { Table } from 'antd';
import { Tag } from '../../../../../../common/components';

import { NameCell } from '../name-cell/name-cell';
import { BroadcastURLCell } from '../broadcast-url-cell/broadcast-url-cell';
import { OrganizerCell } from '../organizer-cell/organizer-cell';
import { DateCell } from '../date-cell/date-cell';
import { AppMode, IEventCategory, ITableRowInfo, TimeZone } from '../../../../../../models/app.models';
import { rowSelection } from './table.models';

interface ITableContent {
  rowsContent: ITableRowInfo[];
  appMode: AppMode;
  timeZone: TimeZone;
  onChange: (newRowContent: ITableRowInfo) => void;
  onSelect: () => void;
  onSelectAll: () => void;
  onTimeEdit: (id: string) => void;
  onDateEdit: (id: string) => void;
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
  onDateEdit,
  onTimeEdit,
  onOrganizerEdit,
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
      render: (eventCategory: IEventCategory) => (
        <Tag
          text={eventCategory.categoryName}
          textColor={eventCategory.textColor}
          backgroundColor={eventCategory.backgroundColor}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text: string, record: { id: string }) => (
        <NameCell name={text} appMode={appMode} onEditClick={() => onNameEdit(record.id, text)} />
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Date',
      dataIndex: 'dateTime',
      render: (text: string, record: { id: string }) => (
        <DateCell
          appMode={appMode}
          onEditClick={() => onDateEdit(record.id)}
          dateTime={text}
          timeZone={timeZone}
        />
      ),
    },
    {
      title: 'Time',
      dataIndex: 'dateTime',
      visible: false,
      render: (text: string, record: { id: string }) => (
        <DateCell
          appMode={appMode}
          onEditClick={() => onTimeEdit(record.id)}
          dateTime={text}
          timeZone={timeZone}
        />
      ),
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      render: (text: string, record: { id: string }) => (
        <OrganizerCell appMode={appMode} gitLink={text} onEditClick={() => onOrganizerEdit(record.id)} />
      ),
    },
    {
      title: 'BroadcastUrl',
      dataIndex: 'broadcastUrl',
      render: (url: string, record: { id: string }) => (
        <BroadcastURLCell appMode={appMode} link={url} onEditClick={() => onBroadcastUrlEdit(record.id)} />
      ),
    },
  ];

  return (
    <Table
      rowSelection={{
        ...rowSelection,
      }}
      columns={columns}
      dataSource={rowsContent}
      pagination={false}
    />
  );
};
