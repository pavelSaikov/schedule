import './table-schedule.scss';

import { Button, Collapse, Space } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import cloneDeep from 'lodash.clonedeep';
import moment from 'moment';
import React, { useCallback, useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  appModeSelector,
  timeZoneSelector,
} from '../../../../common/components/common-header/store/common-header.selectors';
import { DropdownSelector } from '../../../../common/components/dropdown-selector/dropdown-selector';
import { AppMode, IEvent, IEventCategory, TimeZone } from '../../../../models/app.models';
import { eventsSelector, eventCategoriesSelector } from '../../../../store/app.selectors';
import { uploadUpdatedEvent } from '../../../description/store/description.thunks';
import { setCheckedColumns, setCheckedEventCategories } from '../../store/main.actions';
import { checkedColumnsSelector, checkedEventCategoriesSelector } from '../../store/main.selectors';
import { TableContent, TableModals } from './components';
import { COLUMN_TITLES } from './components/table-content/table-content.models';
import { IModalsState } from './components/table-modals/table-modals.models';
import {
  filterEvents,
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
  const checkedEventCategories: string[] = useSelector(checkedEventCategoriesSelector);
  const checkedColumns = useSelector(checkedColumnsSelector);
  const dispatch = useDispatch();

  const [rowsSortedByWeeks, setRowsSortedByWeeks] = useState<IRowsSortedByWeeks>();
  const [visibleRowsSortedByWeeks, setVisibleRowsSortedByWeeks] = useState<IRowsSortedByWeeks>();
  const [modalsState, setModalsState] = useState<IModalsState>(DEFAULT_MODALS_STATE);
  const [idEditableEvent, setIdEditableEvent] = useState<string>();
  const [eventCategoryNameOfEditableEvent, setEventCategoryNameOfEditableEvent] = useState<string>();
  const [selectedRows, setSelectedRows] = useState<ISelectedRows>({});
  const [hiddenRows, setHiddenRows] = useState<ISelectedRows>({});
  const [isShowButtonAvailable, setIsShowButtonAvailable] = useState(false);
  const [isHideButtonAvailable, setIsHideButtonAvailable] = useState(false);

  useEffect(() => {
    const rowsContent: ITableRowInfo[] = prepareTableRowInfo(events, eventCategories);
    const separatedByWeeks: IRowsSortedByWeeks = separateByWeeks(rowsContent, timeZone);
    setRowsSortedByWeeks(separatedByWeeks);
  }, [eventCategories, events, timeZone]);

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

    const newVisibleRows = filterEvents(rowsSortedByWeeks, hiddenRows, checkedEventCategories);

    setVisibleRowsSortedByWeeks(newVisibleRows);
  }, [checkedEventCategories, hiddenRows, rowsSortedByWeeks]);

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

  const onChangeRowCategories = useCallback(
    (checkedValues: string[]) => dispatch(setCheckedColumns({ payload: [...checkedValues] })),
    [dispatch],
  );

  const onChangeEventCategories = useCallback(
    (checkedValues: string[]) => dispatch(setCheckedEventCategories({ payload: checkedValues })),
    [dispatch],
  );

  return (
    <div>
      <div className="table-schedule_controls">
        <Space>
          <DropdownSelector
            buttonText="Table Columns"
            categories={COLUMN_TITLES}
            checkedCategories={checkedColumns}
            onCheckedCategoriesChange={onChangeRowCategories}
          />
          <DropdownSelector
            buttonText="Event Categories"
            categories={eventCategories.map(e => e.categoryName)}
            checkedCategories={checkedEventCategories}
            onCheckedCategoriesChange={onChangeEventCategories}
          />
        </Space>
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
            const week: ITableRowInfo[] = visibleRowsSortedByWeeks[key];
            const firstDay: string = moment(week[0].dateTime).tz(timeZone).day(1).format('DD MMMM');
            const lastDay: string = moment(week[week.length - 1].dateTime)
              .tz(timeZone)
              .day(7)
              .format('DD MMMM');

            return (
              <CollapsePanel
                key={`${key} ${week.length}`}
                header={`Week #${index + 1} (${firstDay} - ${lastDay})`}
              >
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
