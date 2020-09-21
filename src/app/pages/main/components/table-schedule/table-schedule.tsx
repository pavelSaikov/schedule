import './table-schedule.scss';

import { Button, Checkbox, Collapse, Dropdown, Menu, Space } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import cloneDeep from 'lodash.clonedeep';
import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  appModeSelector,
  timeZoneSelector,
} from '../../../../common/components/common-header/store/common-header.selectors';
import { AppMode, IEvent, IEventCategory, TimeZone } from '../../../../models/app.models';
import { eventsSelector, eventCategoriesSelector } from '../../../../store/app.selectors';
import { uploadUpdatedEvent } from '../../../description/store/description.thunks';
import { TableContent, TableModals } from './components';
import { COLUMN_TITLES } from './components/table-content/table-content.models';
import { IModalsState } from './components/table-modals/table-modals.models';
import {
  prepareTableRowInfo,
  separateByWeeks,
  DEFAULT_MODALS_STATE,
  IRowsSortedByWeeks,
  ISelectedRows,
  ITableRowInfo,
} from './table-schedule.models';

interface ITableSchedule {
  onMoreClick: (id: string) => void;
}

export const TableSchedule: FC<ITableSchedule> = ({ onMoreClick }) => {
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const appMode: AppMode = useSelector(appModeSelector);
  const events: IEvent[] = useSelector(eventsSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);
  const dispatch = useDispatch();

  const [rowsSortedByWeeks, setRowsSortedByWeeks] = useState<IRowsSortedByWeeks>();
  const [visibleRowsSortedByWeeks, setVisibleRowsSortedByWeeks] = useState<IRowsSortedByWeeks>();
  const [modalsState, setModalsState] = useState<IModalsState>(DEFAULT_MODALS_STATE);
  const [idEditableEvent, setIdEditableEvent] = useState<string>();
  const [eventCategoryNameOfEditableEvent, setEventCategoryNameOfEditableEvent] = useState<string>();
  const [checkedColumns, setCheckedColumns] = useState<string[]>([...COLUMN_TITLES]);
  const [menuColumns] = useState([...COLUMN_TITLES]);
  const [isColumnsMenuVisible, setIsColumnsMenuVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ISelectedRows>({});
  const [hiddenRows, setHiddenRows] = useState<ISelectedRows>({});
  const [isShowButtonAvailable, setIsShowButtonAvailable] = useState(false);
  const [isHideButtonAvailable, setIsHideButtonAvailable] = useState(false);

  useEffect(() => {
    if (visibleRowsSortedByWeeks) {
      return;
    }

    const rowsContent: ITableRowInfo[] = prepareTableRowInfo(events, eventCategories);
    const separatedByWeeks: IRowsSortedByWeeks = separateByWeeks(rowsContent, timeZone);
    setRowsSortedByWeeks(separatedByWeeks);
    setVisibleRowsSortedByWeeks(cloneDeep(separatedByWeeks));
  }, [eventCategories, events, timeZone, visibleRowsSortedByWeeks]);

  useEffect(() => setIsHideButtonAvailable(Object.values(selectedRows).some(arr => arr.length !== 0)), [
    selectedRows,
  ]);

  useEffect(() => setIsShowButtonAvailable(Object.values(hiddenRows).some(arr => arr.length !== 0)), [
    hiddenRows,
  ]);

  useEffect(() => {
    if (!rowsSortedByWeeks) {
      return;
    }

    const newVisibleRows = Object.keys(rowsSortedByWeeks).reduce(
      (result: IRowsSortedByWeeks, key: string) => {
        const visibleEvents: ITableRowInfo[] = rowsSortedByWeeks[key].filter(
          e => !hiddenRows[key] || !hiddenRows[key].includes(`${e.id} ${e.eventCategory.categoryName}`),
        );

        result[key] = visibleEvents;
        return result;
      },
      {},
    );

    setVisibleRowsSortedByWeeks(newVisibleRows);
  }, [hiddenRows, rowsSortedByWeeks]);

  const onModalsClose = useCallback(() => setModalsState(DEFAULT_MODALS_STATE), []);

  const onOrganizerEdit = useCallback((id: string) => {
    setIdEditableEvent(id);
    setModalsState({ ...DEFAULT_MODALS_STATE, isOrganizerModalOpen: true });
  }, []);

  const onDateEdit = useCallback((id: string, eventCategoryName: string) => {
    setIdEditableEvent(id);
    setEventCategoryNameOfEditableEvent(eventCategoryName);
    setModalsState({ ...DEFAULT_MODALS_STATE, isDateModalOpen: true });
  }, []);

  const onTimeEdit = useCallback((id: string, eventCategoryName: string) => {
    setIdEditableEvent(id);
    setEventCategoryNameOfEditableEvent(eventCategoryName);
    setModalsState({ ...DEFAULT_MODALS_STATE, isTimeModalOpen: true });
  }, []);

  const onBroadCastUrlEdit = useCallback((id: string) => {
    setIdEditableEvent(id);
    setModalsState({ ...DEFAULT_MODALS_STATE, isBroadcastUrlModalOpen: true });
  }, []);

  const onEventCategoryEdit = useCallback((id: string) => {
    setIdEditableEvent(id);
    setModalsState({ ...DEFAULT_MODALS_STATE, isEventCategoryModalOpen: true });
  }, []);

  const onTitleEdit = useCallback(
    (id: string, newTitle: string) => {
      const updatedEvent: IEvent = cloneDeep(events.find(e => e.id === id));

      if (updatedEvent.title === newTitle) {
        return;
      }

      updatedEvent.title = newTitle;
      dispatch(uploadUpdatedEvent(updatedEvent, new AbortController()));
    },
    [dispatch, events],
  );

  const onCommentEdit = useCallback(
    (id: string, newComment: string) => {
      const updatedEvent: IEvent = cloneDeep(events.find(e => e.id === id));

      if (updatedEvent.comment === newComment) {
        return;
      }

      updatedEvent.comment = newComment;
      dispatch(uploadUpdatedEvent(updatedEvent, new AbortController()));
    },
    [dispatch, events],
  );

  const onMore = useCallback((id: string) => onMoreClick(id), [onMoreClick]);

  const onSelect = useCallback(
    (week: string, ids: string[]) =>
      setSelectedRows(prevRows => ({
        ...prevRows,
        [week]: prevRows[week] ? [...prevRows[week], ...ids] : ids,
      })),
    [],
  );

  const onHide = useCallback(() => {
    const newHiddenRows: ISelectedRows = Object.keys(selectedRows).reduce(
      (result, k) => {
        result[k] = hiddenRows[k] ? [...hiddenRows[k], ...selectedRows[k]] : [...selectedRows[k]];

        return result;
      },
      { ...hiddenRows },
    );

    setSelectedRows({});
    setHiddenRows(newHiddenRows);
  }, [hiddenRows, selectedRows]);

  const onShow = useCallback(() => setHiddenRows({}), []);

  const onChangeRowCategories = useCallback((checkedValues: string[]) => {
    setCheckedColumns(checkedValues);
  }, []);

  const handleVisibilityChange = useCallback((flag: boolean) => setIsColumnsMenuVisible(flag), []);

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
    <div>
      <h1>Table Schedule</h1>
      <div className="table-schedule_controls">
        <Dropdown
          overlay={visibilityMenu}
          onVisibleChange={handleVisibilityChange}
          visible={isColumnsMenuVisible}
        >
          <Button className="table-schedule_dropdown" type="primary">
            Table Columns
          </Button>
        </Dropdown>
        <Space>
          <Button type="primary" disabled={!isShowButtonAvailable} onClick={onShow}>
            Show
          </Button>
          <Button type="primary" disabled={!isHideButtonAvailable} onClick={onHide}>
            Hide
          </Button>
        </Space>
      </div>
      {visibleRowsSortedByWeeks && (
        <Collapse accordion>
          {Object.keys(visibleRowsSortedByWeeks).map((key, index) => {
            const week = visibleRowsSortedByWeeks[key];
            return (
              <CollapsePanel key={`${key} ${week.length}`} header={'Week #' + (index + 1)}>
                <TableContent
                  key={`${key} ${week.length}`}
                  checkedColumns={checkedColumns}
                  rowsContent={week}
                  appMode={appMode}
                  timeZone={timeZone}
                  onSelect={(ids: string[]) => onSelect(key, ids)}
                  onTitleEdit={onTitleEdit}
                  onTimeEdit={onTimeEdit}
                  onDateEdit={onDateEdit}
                  onOrganizerEdit={onOrganizerEdit}
                  onCommentEdit={onCommentEdit}
                  onBroadcastUrlEdit={onBroadCastUrlEdit}
                  onCategoryEdit={onEventCategoryEdit}
                  onMoreClick={onMore}
                />
              </CollapsePanel>
            );
          })}
        </Collapse>
      )}
      <TableModals
        modalsState={modalsState}
        idEditableEvent={idEditableEvent}
        editableEventCategoryName={eventCategoryNameOfEditableEvent}
        onModalClose={onModalsClose}
      />
    </div>
  );
};
