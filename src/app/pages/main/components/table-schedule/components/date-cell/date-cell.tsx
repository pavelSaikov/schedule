import './date-cell.scss';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import momentTimeZone from 'moment-timezone';
import React, { useEffect, useState, FC } from 'react';
import { useSelector } from 'react-redux';

import { appModeSelector, timeZoneSelector } from '../../../../../../components/header/store/header.selectors';
import { AppMode } from '../../../../../../models/app.models';

interface IDateCell {
  dateTime: string;
  onEditClick: () => void;
}

export const DateCell: FC<IDateCell> = ({ dateTime, onEditClick }) => {
  const timeZone = useSelector(timeZoneSelector);
  const appMode = useSelector(appModeSelector);

  useEffect(() => setDate(momentTimeZone.tz(dateTime, timeZone).format('DD MM YYYY').split(' ').join('-')), [
    dateTime,
    timeZone,
  ]);

  const [date, setDate] = useState<string>();

  return (
    <div className="date-cell_wrapper">
      <Text className="date-cell_date">{date}</Text>
      {appMode === AppMode.mentor && (
        <Tooltip title="Edit Date">
          <EditOutlined className="date-cell_edit-icon" onClick={onEditClick} />
        </Tooltip>
      )}
    </div>
  );
};
