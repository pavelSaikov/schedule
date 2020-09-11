import './common-header.scss';

import { EditOutlined } from '@ant-design/icons';
import { Button, Select, Switch } from 'antd';
import React, { useCallback, useEffect, useRef, useState, FC, MutableRefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppMode, IEventCategory, TimeZone, TimeZones } from '../../../models/app.models';
import { eventCategoriesSelector } from '../../../store/app.selectors';
import { setAppMode, setTimeZone } from './store/common-header.actions';
import { appModeSelector, timeZoneSelector } from './store/common-header.selectors';
import { uploadEventCategories } from './store/common-header.thunks';
import { ColorsEditor } from '..';

export const CommonHeader: FC = () => {
  const dispatch = useDispatch();
  const mode: AppMode = useSelector(appModeSelector);
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);

  const [isColorsEditorOpen, setIsColorsEditorOpen] = useState(false);
  const abortControllerRef: MutableRefObject<AbortController> = useRef();

  useEffect(() => () => (abortControllerRef.current ? abortControllerRef.current.abort() : null), []);

  const onTimeZoneChange = useCallback(
    (value: TimeZone) => {
      if (value === timeZone) {
        return;
      }
      dispatch(setTimeZone({ payload: value }));
    },
    [dispatch, timeZone],
  );

  const onModeChange = useCallback(
    (checked: boolean) => dispatch(setAppMode({ payload: checked ? AppMode.mentor : AppMode.student })),
    [dispatch],
  );

  const onEditColors = useCallback(() => setIsColorsEditorOpen(true), []);

  const onModalOk = useCallback(
    (eventCategories: IEventCategory[]) => {
      setIsColorsEditorOpen(false);

      abortControllerRef.current ? abortControllerRef.current.abort() : null;

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      dispatch(uploadEventCategories(eventCategories, abortController));
    },
    [dispatch],
  );

  return (
    timeZone && (
      <div className="header_header-wrapper">
        <div>
          <Select className="header_select" defaultValue={timeZone} onChange={onTimeZoneChange}>
            {TimeZones.map(timeZone => (
              <Select.Option value={timeZone} key={timeZone}>
                {timeZone}
              </Select.Option>
            ))}
          </Select>
          <Button type={'primary'} icon={<EditOutlined />} onClick={onEditColors}>
            Edit Colors
          </Button>
        </div>
        <Switch
          className="header_switch"
          unCheckedChildren="stu"
          checkedChildren="men"
          defaultChecked={mode === AppMode.mentor}
          onChange={onModeChange}
        />
        <ColorsEditor
          defaultEventCategories={eventCategories}
          currentEventCategory={eventCategories[0]}
          isVisible={isColorsEditorOpen}
          isUserCanAddNewCategories={false}
          onCancelClick={() => setIsColorsEditorOpen(false)}
          onOkClick={onModalOk}
        />
      </div>
    )
  );
};
