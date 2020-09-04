import { Menu } from 'antd';
import React, { useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScheduleMode, ScheduleModes } from '../../../../models/app.models';
import { setScheduleMode } from '../../store/main.actions';
import { scheduleModeSelector } from '../../store/main.selectors';

export const ScheduleNavigation: FC = () => {
  const scheduleMode: ScheduleMode = useSelector(scheduleModeSelector);
  const dispatch = useDispatch();

  const onMenuItemClick = useCallback(e => dispatch(setScheduleMode({ payload: e.key })), []);

  return (
    <div>
      <Menu selectedKeys={[scheduleMode]} onClick={onMenuItemClick} mode="horizontal">
        {ScheduleModes.map(scheduleMode => (
          <Menu.Item key={scheduleMode}>{scheduleMode}</Menu.Item>
        ))}
      </Menu>
    </div>
  );
};
