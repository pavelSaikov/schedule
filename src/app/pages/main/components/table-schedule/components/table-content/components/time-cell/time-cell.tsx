import './time-cell.scss';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment-timezone';
import React, { useEffect, useState, FC } from 'react';

import { AppMode, TimeZone } from '../../../../../../../../models/app.models';

interface ITimeCell {
  dateTime: string;
  onEditClick: () => void;
  timeZone: TimeZone;
  appMode: AppMode;
}

export const TimeCell: FC<ITimeCell> = ({ dateTime, onEditClick, timeZone, appMode }) => {
  const [time, setTime] = useState<string>();

  useEffect(() => setTime(moment.tz(dateTime, timeZone).format('HH:mm')), [timeZone, dateTime]);

  return (
    <div className="time-cell_wrapper">
      <Text className="time-cell_time">{time}</Text>
      {appMode === AppMode.mentor && (
        <Tooltip title="Edit Time">
          <EditOutlined className="time-cell_edit-icon" onClick={onEditClick} />
        </Tooltip>
      )}
    </div>
  );
};
