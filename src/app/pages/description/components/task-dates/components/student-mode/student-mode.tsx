import './student-mode.scss';

import { Statistic } from 'antd';
import moment from 'moment-timezone';
import React, { useEffect, useState, FC } from 'react';

import { TimeZone } from '../../../../../../models/app.models';

interface IStudentMode {
  startDateTime: string;
  deadlineDateTime: string;
  timeZone: TimeZone;
}

export const StudentMode: FC<IStudentMode> = ({ startDateTime, deadlineDateTime, timeZone }) => {
  const [startMoment, setStartMoment] = useState<string>(null);
  const [deadlineMoment, setDeadlineMoment] = useState<string>(null);

  useEffect(() => setStartMoment(moment(startDateTime).tz(timeZone).format('DD-MM-YYYY HH:mm')), [
    startDateTime,
    timeZone,
  ]);

  useEffect(() => {
    deadlineDateTime.length
      ? setDeadlineMoment(moment(deadlineDateTime).tz(timeZone).format('DD-MM-YYYY HH:mm'))
      : setDeadlineMoment('');
  }, [deadlineDateTime, timeZone]);

  return (
    <div className="student-mode_dates-container">
      {startMoment && <Statistic title="Start Date" value={startMoment} />}
      {deadlineMoment && (
        <Statistic
          className="student-mode_deadline-date"
          title="Deadline Date"
          value={deadlineMoment}
          valueStyle={{ color: '#cf1322' }}
        />
      )}
    </div>
  );
};
