import './header.scss';

import { EditOutlined } from '@ant-design/icons';
import { Button, Select, Switch } from 'antd';
import React, { useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppMode, TimeZone, TimeZones } from '../../models/app.models';
import { setAppMode, setTimeZone } from './store/header.actions';
import { appModeSelector, timeZoneSelector } from './store/header.selectors';

export const CommonHeader: FC = () => {
  const mode: AppMode = useSelector(appModeSelector);
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const dispatch = useDispatch();

  const onTimeZoneChange = useCallback((value: TimeZone) => {
    if (value === timeZone) {
      return;
    }
    dispatch(setTimeZone({ payload: value }));
  }, []);

  const onModeChange = useCallback(
    (checked: boolean) => dispatch(setAppMode({ payload: checked ? AppMode.mentor : AppMode.student })),
    [],
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
          <Button type={'primary'} icon={<EditOutlined />}>
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
      </div>
    )
  );
};
