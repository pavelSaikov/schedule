import './header.scss';

import { EditOutlined } from '@ant-design/icons';
import { Button, Select, Switch } from 'antd';
import React, { useCallback, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppMode, IEventCategory, TimeZone, TimeZones } from '../../../models/app.models';
import { eventCategoriesSelector } from '../../../store/app.selectors';
import { ModalWindow } from '../colors-editor/colors-editor';
import { setAppMode, setTimeZone } from './store/header.actions';
import { appModeSelector, timeZoneSelector } from './store/header.selectors';

export const CommonHeader: FC = () => {
  const mode: AppMode = useSelector(appModeSelector);
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);
  const dispatch = useDispatch();

  const [isColorsEditorOpen, setIsColorsEditorOpen] = useState(false);

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
        <ModalWindow
          defaultEventCategories={eventCategories}
          currentEventCategory={eventCategories[0]}
          isVisible={isColorsEditorOpen}
          onCancelClick={() => setIsColorsEditorOpen(false)}
          onOkClick={(eventCategories: IEventCategory[], selectedCategory: IEventCategory) => {
            setIsColorsEditorOpen(false);
            console.log('Event categories', eventCategories);
            console.log('selected category', selectedCategory);
          }}
        />
      </div>
    )
  );
};
