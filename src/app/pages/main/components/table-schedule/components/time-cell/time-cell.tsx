import './time-cell.scss';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import momentTimeZone from 'moment-timezone';
import React, { useEffect, useState, FC } from 'react';
import { useSelector } from 'react-redux';

import { appModeSelector, timeZoneSelector } from '../../../../../../components/header/store/header.selectors';
import { AppMode, TimeZone } from '../../../../../../models/app.models';

interface ITimeCell {
  dateTime: string;
  onEditClick: () => void;
}

export const TimeCell: FC<ITimeCell> = ({ dateTime, onEditClick }) => {
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const appMode: AppMode = useSelector(appModeSelector);

  const [time, setTime] = useState<string>();

  useEffect(() => setTime(momentTimeZone.tz(dateTime, timeZone).format('HH mm').split(' ').join(':')), [
    timeZone,
    dateTime,
  ]);

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
