import { message } from 'antd';
import cloneDeep from 'lodash.clonedeep';
import React, { useCallback, useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ColorsEditor } from '../../../../../../common/components';
import { timeZoneSelector } from '../../../../../../common/components/common-header/store/common-header.selectors';
import { uploadEventCategories } from '../../../../../../common/components/common-header/store/common-header.thunks';
import { OrganizerEditor } from '../../../../../../common/components/organizer-editor/organizer-editor';
import { IEvent, IEventCategory, RowCategoryName, TimeZone } from '../../../../../../models/app.models';
import { eventsSelector, eventCategoriesSelector } from '../../../../../../store/app.selectors';
import { uploadUpdatedEvent } from '../../../../../description/store/description.thunks';
import { setCheckedEventCategories } from '../../../../store/main.actions';
import { checkedEventCategoriesSelector } from '../../../../store/main.selectors';
import { EditBroadcastLinkModal, EditDateModal, EditTimeModal } from './components';
import { checkIsTimeCanBeChanged, IModalsState } from './table-modals.models';

interface ITableModals {
  idEditableEvent: string;
  editableEventCategoryName: string;
  onModalClose: () => void;
  modalsState: IModalsState;
}

export const TableModals: FC<ITableModals> = ({
  idEditableEvent,
  editableEventCategoryName,
  onModalClose,
  modalsState,
}) => {
  const events: IEvent[] = useSelector(eventsSelector);
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);
  const checkedEventCategories: string[] = useSelector(checkedEventCategoriesSelector);
  const dispatch = useDispatch();

  const [editableEvent, setEditableEvent] = useState<IEvent>();
  const [previousIdEditableEvent, setPreviousIdEditableEvent] = useState<string>();

  useEffect(() => {
    if (previousIdEditableEvent === idEditableEvent) {
      return;
    }

    const editableEvent: IEvent = cloneDeep(events.find(e => e.id === idEditableEvent));
    setEditableEvent(editableEvent);
    setPreviousIdEditableEvent(idEditableEvent);
  }, [events, idEditableEvent, previousIdEditableEvent]);

  const onCancelClick = useCallback(() => onModalClose(), [onModalClose]);

  const reflectEventChanges = useCallback(
    (event: IEvent) => {
      dispatch(uploadUpdatedEvent(cloneDeep(event), new AbortController()));
      setEditableEvent(cloneDeep(event));
    },
    [dispatch],
  );

  const onOrganizerEdit = useCallback(
    (newOrganizer: string) => {
      onModalClose();

      if (newOrganizer === editableEvent.organizer) {
        return;
      }

      const newEvent: IEvent = cloneDeep(editableEvent);
      newEvent.organizer = newOrganizer;
      reflectEventChanges(newEvent);
    },
    [editableEvent, onModalClose, reflectEventChanges],
  );

  const onTimeEdit = useCallback(
    (newDate: string) => {
      onModalClose();

      if (
        (editableEventCategoryName === RowCategoryName.deadline && newDate === editableEvent.deadlineDate) ||
        (editableEventCategoryName !== RowCategoryName.deadline && newDate === editableEvent.dateTime)
      ) {
        return;
      }

      if (checkIsTimeCanBeChanged(editableEvent, newDate, editableEventCategoryName)) {
        const newEvent: IEvent = cloneDeep(editableEvent);
        editableEventCategoryName === RowCategoryName.deadline
          ? (newEvent.deadlineDate = newDate)
          : (newEvent.dateTime = newDate);
        reflectEventChanges(newEvent);
        return;
      }

      message.error('Invalid Time. Check, that deadline time more is than start date on one hour', 3);
    },
    [editableEvent, editableEventCategoryName, onModalClose, reflectEventChanges],
  );

  const onBroadcastUrlEdit = useCallback(
    (newUrl: string) => {
      onModalClose();

      if (newUrl === editableEvent.broadcastUrl) {
        return;
      }

      const newEvent: IEvent = cloneDeep(editableEvent);
      newEvent.broadcastUrl = newUrl;
      reflectEventChanges(newEvent);
    },
    [editableEvent, onModalClose, reflectEventChanges],
  );

  const onEventCategoryEdit = useCallback(
    (updatedEventCategories: IEventCategory[], newEventCategory: IEventCategory) => {
      onModalClose();

      const nameOfNewEventCategories: string[] = updatedEventCategories.reduce(
        (result, updatedEventCategory) => {
          let isNewEventCategory = true;
          eventCategories.forEach(ec => {
            if (ec.categoryName === updatedEventCategory.categoryName) {
              isNewEventCategory = false;
            }
          });

          if (isNewEventCategory) {
            result.push(updatedEventCategory.categoryName);
          }

          return result;
        },
        [],
      );

      const newCheckedEventCategories = [...checkedEventCategories, ...nameOfNewEventCategories];

      dispatch(setCheckedEventCategories({ payload: newCheckedEventCategories }));
      dispatch(
        uploadEventCategories(
          [
            ...updatedEventCategories,
            eventCategories.find(ec => ec.categoryName === RowCategoryName.deadline),
          ],
          new AbortController(),
        ),
      );

      if (editableEvent.eventCategoryName === newEventCategory.categoryName) {
        return;
      }

      const newEvent: IEvent = cloneDeep(editableEvent);
      newEvent.eventCategoryName = newEventCategory.categoryName;
      reflectEventChanges(newEvent);
    },
    [checkedEventCategories, dispatch, editableEvent, eventCategories, onModalClose, reflectEventChanges],
  );

  return (
    <>
      {null}
      {editableEvent && (
        <>
          <OrganizerEditor
            onCancelClick={onCancelClick}
            onOrganizerEdit={onOrganizerEdit}
            visible={modalsState.isOrganizerModalOpen}
            organizer={editableEvent.organizer}
          />
          <EditDateModal
            onCancelClick={onModalClose}
            onConfirmClick={onTimeEdit}
            visible={modalsState.isDateModalOpen}
            defaultDateTime={
              editableEventCategoryName === RowCategoryName.deadline
                ? editableEvent.deadlineDate
                : editableEvent.dateTime
            }
            defaultTimeZone={timeZone}
          />
          <EditTimeModal
            onCancelClick={onCancelClick}
            onConfirmClick={onTimeEdit}
            visible={modalsState.isTimeModalOpen}
            defaultDateTime={
              editableEventCategoryName === RowCategoryName.deadline
                ? editableEvent.deadlineDate
                : editableEvent.dateTime
            }
            defaultTimeZone={timeZone}
          />
          <EditBroadcastLinkModal
            onCancelClick={onCancelClick}
            onConfirmClick={onBroadcastUrlEdit}
            visible={modalsState.isBroadcastUrlModalOpen}
            defaultLink={editableEvent.broadcastUrl}
          />
          <ColorsEditor
            onCancelClick={onCancelClick}
            onOkClick={onEventCategoryEdit}
            currentEventCategory={{
              ...eventCategories.find(e => editableEvent.eventCategoryName === e.categoryName),
            }}
            defaultEventCategories={eventCategories}
            isUserCanAddNewCategories={true}
            isVisible={modalsState.isEventCategoryModalOpen}
          />
        </>
      )}
    </>
  );
};
