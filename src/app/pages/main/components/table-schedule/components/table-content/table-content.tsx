import './table-content.scss';

import { Button, Table } from 'antd';
import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';

import { AppMode, IEventCategory, TimeZone } from '../../../../../../models/app.models';
import { ITableRowInfo } from '../../table-schedule.models';
import { DateCell } from './components/date-cell/date-cell';
import { BroadcastURLCell, EventCategoryCell, NameCell, OrganizerCell, TimeCell } from './components/index';
import { COLUMN_TITLE } from './table-content.models';

interface ITableContent {
  rowsContent: ITableRowInfo[];
  checkedColumns: string[];
  className: string;
  appMode: AppMode;
  timeZone: TimeZone;
  onSelect: (ids: string[]) => void;
  onTitleEdit: (id: string, title: string) => void;
  onTimeEdit: (id: string, eventCategoryName: string) => void;
  onDateEdit: (id: string, eventCategoryName: string) => void;
  onCategoryEdit: (id: string) => void;
  onOrganizerEdit: (id: string) => void;
  onCommentEdit: (id: string, comment: string) => void;
  onBroadcastUrlEdit: (id: string) => void;
  onMoreClick: (id: string) => void;
}

export const TableContent: FC<ITableContent> = ({
  rowsContent,
  checkedColumns,
  className,
  appMode,
  timeZone,
  onSelect,
  onTitleEdit,
  onDateEdit,
  onTimeEdit,
  onOrganizerEdit,
  onCategoryEdit,
  onCommentEdit,
  onBroadcastUrlEdit,
  onMoreClick,
}) => {
  const [filteredColumns, setFiltered] = useState([]);

  const columns = useMemo(
    () => [
      {
        title: COLUMN_TITLE.EventType,
        dataIndex: 'eventCategory',
        render: (eventCategory: IEventCategory, record: ITableRowInfo) => ({
          props: { width: '100px' },
          children: (
            <EventCategoryCell
              appMode={appMode}
              eventCategory={eventCategory}
              onEditClick={() => onCategoryEdit(record.id)}
            />
          ),
        }),
      },
      {
        title: COLUMN_TITLE.Title,
        dataIndex: 'title',
        render: (text: string, record: ITableRowInfo) => ({
          props: { width: '170px' },
          children: (
            <NameCell
              name={text}
              appMode={appMode}
              onEditClick={(title: string) => onTitleEdit(record.id, title)}
            />
          ),
        }),
      },
      {
        title: COLUMN_TITLE.Comment,
        dataIndex: 'comment',
        render: (text, record) => ({
          props: {
            width: '160px',
          },
          children: (
            <NameCell
              appMode={appMode}
              name={text}
              onEditClick={(comment: string) => onCommentEdit(record.id, comment)}
            />
          ),
        }),
      },
      {
        title: COLUMN_TITLE.Date,
        dataIndex: 'dateTime',
        render: (text: string, record: ITableRowInfo) => ({
          props: { width: '100px' },
          children: (
            <DateCell
              appMode={appMode}
              onEditClick={() => onDateEdit(record.id, record.eventCategory.categoryName)}
              dateTime={text}
              timeZone={timeZone}
            />
          ),
        }),
      },
      {
        title: COLUMN_TITLE.Time,
        dataIndex: 'dateTime',
        visible: false,
        render: (text: string, record: ITableRowInfo) => ({
          props: { width: '60px' },
          children: (
            <TimeCell
              appMode={appMode}
              onEditClick={() => onTimeEdit(record.id, record.eventCategory.categoryName)}
              dateTime={text}
              timeZone={timeZone}
            />
          ),
        }),
      },
      {
        title: COLUMN_TITLE.Organizer,
        dataIndex: 'organizer',
        render: (text: string, record: ITableRowInfo) => ({
          props: { width: '150px' },
          children: (
            <OrganizerCell appMode={appMode} gitLink={text} onEditClick={() => onOrganizerEdit(record.id)} />
          ),
        }),
      },
      {
        title: COLUMN_TITLE.BroadcastUrl,
        dataIndex: 'broadcastUrl',
        render: (url: string, record: ITableRowInfo) => ({
          props: { width: '120px' },
          children: (
            <BroadcastURLCell
              appMode={appMode}
              link={url}
              onEditClick={() => onBroadcastUrlEdit(record.id)}
            />
          ),
        }),
      },
      {
        title: COLUMN_TITLE.Action,
        dataIndex: 'id',
        render: (id: string) => ({
          props: { width: '80px' },
          children: (
            <Button type="primary" onClick={() => onMoreClick(id)}>
              More
            </Button>
          ),
        }),
      },
    ],
    [
      appMode,
      onBroadcastUrlEdit,
      onCategoryEdit,
      onCommentEdit,
      onDateEdit,
      onMoreClick,
      onOrganizerEdit,
      onTimeEdit,
      onTitleEdit,
      timeZone,
    ],
  );

  const filterColumns = useCallback(() => {
    const filtered = columns.filter(el => {
      return checkedColumns.indexOf(el.title) !== -1;
    });
    setFiltered(filtered);
  }, [checkedColumns, columns, setFiltered]);

  useEffect(() => {
    const cols = [];
    columns.map(column => cols.push(column.title));
    setFiltered(columns);
  }, [columns]);

  useEffect(() => filterColumns(), [checkedColumns, filterColumns]);

  return (
    <>
      <Table
        rowClassName={className}
        rowKey={(record: ITableRowInfo) => record.id + record.eventCategory.categoryName}
        rowSelection={{
          onChange: (_, selectedRows: ITableRowInfo[]) =>
            onSelect(selectedRows.map(r => `${r.id} ${r.eventCategory.categoryName}`)),
        }}
        columns={filteredColumns}
        dataSource={rowsContent}
        pagination={false}
        className={'table-schedule'}
      />
    </>
  );
};
