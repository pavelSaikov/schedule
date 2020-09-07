import './task-dates.scss';

import React, { FC } from 'react';

import { AppMode, TimeZone } from '../../../../models/app.models';
import { MentorMode } from './components/mentor-mode/mentor-mode';
import { StudentMode } from './components/student-mode/student-mode';
import Text from 'antd/lib/typography/Text';

interface ITaskDates {
  startDateTime: string;
  deadlineDateTime: string;
  appMode: AppMode;
  timeZone: TimeZone;
  onChangeStartDate: (newStartDateTime: string) => void;
  onChangeDeadlineDate: (newDeadlineDateTime: string) => void;
}

export const TaskDates: FC<ITaskDates> = ({
  startDateTime,
  deadlineDateTime,
  timeZone,
  appMode,
  onChangeStartDate,
  onChangeDeadlineDate,
}) => {
  return (
    <div className="task-dates_dates-container">
      {appMode === AppMode.mentor && (
        <MentorMode
          timeZone={timeZone}
          startDateTime={startDateTime}
          deadlineDateTime={deadlineDateTime}
          onChangeStartDate={onChangeStartDate}
          onChangeDeadlineDate={onChangeDeadlineDate}
        />
      )}
      <div className={appMode === AppMode.mentor ? 'task-dates_preview-container' : ''}>
        {appMode === AppMode.mentor && (
          <Text type="secondary" className="task-dates_preview-text">
            Preview
          </Text>
        )}
        <StudentMode startDateTime={startDateTime} deadlineDateTime={deadlineDateTime} timeZone={timeZone} />
      </div>
    </div>
  );
};
