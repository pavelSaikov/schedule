import { Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import cloneDeep from 'lodash.clonedeep';
import React, { useCallback, useEffect, useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  appModeSelector,
  timeZoneSelector,
} from '../../../../common/components/common-header/store/common-header.selectors';
import { AppMode, IEvent, IEventCategory, TimeZone } from '../../../../models/app.models';
import { eventsSelector, eventCategoriesSelector } from '../../../../store/app.selectors';
import { uploadUpdatedEvent } from '../../../description/store/description.thunks';
import { TableModals } from './components';
import { TableContent } from './components/table-content/table-content';
import { IModalsState } from './components/table-modals/table-modals.models';
import {
  prepareTableRowInfo,
  separateByWeeks,
  DEFAULT_MODALS_STATE,
  IRowsSortedByWeeks,
  ITableRowInfo,
} from './table-schedule.models';

export const TableSchedule: FC = () => {
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const appMode: AppMode = useSelector(appModeSelector);
  const events: IEvent[] = useSelector(eventsSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);
  const dispatch = useDispatch();

  const [byWeeks, setByWeeks] = useState<IRowsSortedByWeeks>();
  const [modalsState, setModalsState] = useState<IModalsState>(DEFAULT_MODALS_STATE);
  const [idEditableEvent, setIdEditableEvent] = useState<string>();
  const [eventCategoryNameOfEditableEvent, setEventCategoryNameOfEditableEvent] = useState<string>();

  useEffect(() => {
    const rowsContent: ITableRowInfo[] = prepareTableRowInfo(events, eventCategories);
    setByWeeks(separateByWeeks(rowsContent, timeZone));
  }, [eventCategories, events, timeZone]);

  const onChange = useCallback((n: ITableRowInfo) => console.log(n), []);

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

  return (
    <div>
      <h1>Table Schedule</h1>
      {byWeeks && (
        <Collapse accordion>
          {Object.keys(byWeeks).map((key, index) => {
            const week = byWeeks[key];
            return (
              <CollapsePanel key={key} header={'Week #' + (index + 1)}>
                <TableContent
                  rowsContent={week}
                  appMode={appMode}
                  timeZone={timeZone}
                  onChange={onChange}
                  onSelect={() => {}}
                  onSelectAll={() => {}}
                  onTitleEdit={onTitleEdit}
                  onTimeEdit={onTimeEdit}
                  onDateEdit={onDateEdit}
                  onOrganizerEdit={onOrganizerEdit}
                  onCommentEdit={onCommentEdit}
                  onBroadcastUrlEdit={onBroadCastUrlEdit}
                  onCategoryEdit={onEventCategoryEdit}
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
