import './table.scss';

import { Button, Checkbox, Dropdown, Menu, Table } from 'antd';
import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';

import { columnCategory, AppMode, IEventCategory, TimeZone } from '../../../../../../models/app.models';
import { BroadcastURLCell } from '../broadcast-url-cell/broadcast-url-cell';
import { DateCell } from '../date-cell/date-cell';
import { EventCategoryCell, TimeCell } from '../index';
import { NameCell } from '../name-cell/name-cell';
import { OrganizerCell } from '../organizer-cell/organizer-cell';
import { rowSelection } from './table.models';
import { ITableRowInfo } from '../../table-schedule.models';

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
  const [checkedColumns, setCheckedColumns] = useState([]);
  const [isMenuVisible, changeMenuVisibility] = useState(false);
  const [menuColumns, setMenuColumns] = useState([]);
  const [filteredColumns, setFiltered] = useState([]);

  const columns = useMemo(
    () => [
      {
        title: 'Event type',
        dataIndex: 'eventCategory',
        render: (eventCategory: IEventCategory, record: ITableRowInfo) => ({
          props: { width: '150px' },
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
        title: 'Title',
        dataIndex: 'title',
        render: (text: string, record: ITableRowInfo) => ({
          props: { width: '150px' },
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
        title: 'Comment',
        dataIndex: 'comment',
        render: (text, record) => ({
          props: {
            width: '100px',
          },
          children: text,
        }),
      },
      {
        title: 'Date',
        dataIndex: 'dateTime',
        render: (text: string, record: ITableRowInfo) => ({
          props: { width: '150px' },
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
        title: 'Time',
        dataIndex: 'dateTime',
        visible: false,
        render: (text: string, record: ITableRowInfo) => ({
          props: { width: '150px' },
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
        title: 'Organizer',
        dataIndex: 'organizer',
        render: (text: string, record: ITableRowInfo) => ({
          props: { width: '200px' },
          children: (
            <OrganizerCell appMode={appMode} gitLink={text} onEditClick={() => onOrganizerEdit(record.id)} />
          ),
        }),
      },
      {
        title: 'BroadcastUrl',
        dataIndex: 'broadcastUrl',
        render: (url: string, record: ITableRowInfo) => ({
          props: { width: '150px' },
          children: (
            <BroadcastURLCell
              appMode={appMode}
              link={url}
              onEditClick={() => onBroadcastUrlEdit(record.id)}
            />
          ),
        }),
      },
    ],
    [
      appMode,
      onBroadcastUrlEdit,
      onCategoryEdit,
      onDateEdit,
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
    setCheckedColumns(cols);
    setMenuColumns(cols);
    setFiltered(columns);
  }, [columns]);

  useEffect(() => filterColumns(), [checkedColumns, filterColumns]);

  const onChangeRowCategories = useCallback((checkedValues: columnCategory[]) => {
    setCheckedColumns(checkedValues);
  }, []);

  const handleVisibilityChange = useCallback((flag: boolean) => changeMenuVisibility(flag), []);
  const visibilityMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item title="Columns">
          <Checkbox.Group
            onChange={onChangeRowCategories}
            options={menuColumns}
            value={checkedColumns}
            className="table_checkbox-group"
          />
        </Menu.Item>
      </Menu>
    ),
    [checkedColumns, menuColumns, onChangeRowCategories],
  );
  return (
    <>
      <Dropdown overlay={visibilityMenu} onVisibleChange={handleVisibilityChange} visible={isMenuVisible}>
        <Button>Show/Hide</Button>
      </Dropdown>
      <Table
        rowKey={(record: ITableRowInfo) => record.id + record.eventCategory.categoryName}
        rowSelection={{
          ...rowSelection,
        }}
        columns={filteredColumns}
        dataSource={rowsContent}
        pagination={false}
        className={'table-schedule'}
      />
    </>
  );
};
