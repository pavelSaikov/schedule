import './date-cell.scss';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment-timezone';
import React, { useEffect, useState, FC } from 'react';

import { AppMode, TimeZone } from '../../../../../../../../models/app.models';

interface IDateCell {
  dateTime: string;
  onEditClick: () => void;
  timeZone: TimeZone;
  appMode: AppMode;
}

export const DateCell: FC<IDateCell> = ({ dateTime, onEditClick, timeZone, appMode }) => {
  useEffect(() => setDate(moment.tz(dateTime, timeZone).format('DD-MM-YYYY')), [dateTime, timeZone]);

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
