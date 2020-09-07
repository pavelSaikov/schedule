import './mentor-mode.scss';

import { Checkbox, DatePicker } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Text from 'antd/lib/typography/Text';
import moment, { Moment } from 'moment-timezone';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { BASE_TIMEZONE, TimeZone } from '../../../../../../models/app.models';
import { calculateDisabledTime, calculateDisableDate } from './mentor-model.models';

interface IMentorMode {
  startDateTime: string;
  deadlineDateTime: string;
  timeZone: TimeZone;
  onChangeStartDate: (newStartDate: string) => void;
  onChangeDeadlineDate: (newDeadlineDate: string) => void;
}

export const MentorMode: FC<IMentorMode> = ({
  startDateTime,
  deadlineDateTime,
  timeZone,
  onChangeStartDate,
  onChangeDeadlineDate,
}) => {
  const [startMoment, setStartMoment] = useState<Moment>();
  const [deadlineMoment, setDeadlineMoment] = useState<Moment>();
  const [isDeadlineExist, setIsDeadlineExist] = useState<boolean>(deadlineDateTime.length !== 0);

  useEffect(() => setStartMoment(moment(startDateTime).tz(timeZone)), [startDateTime, timeZone]);

  useEffect(
    () =>
      setDeadlineMoment(
        moment(deadlineDateTime ? deadlineDateTime : startDateTime)
          .add(deadlineDateTime ? 0 : 1, 'h')
          .tz(timeZone),
      ),
    [startDateTime, deadlineDateTime, timeZone],
  );

  const onStartDateChange = useCallback(
    (moment: Moment) => {
      onChangeStartDate(moment.clone().tz(BASE_TIMEZONE).format());
      setStartMoment(moment.clone());
      const deadline = moment.clone().add(1, 'h');
      setDeadlineMoment(deadline.clone());
      onChangeDeadlineDate(deadline.clone().tz(BASE_TIMEZONE).format());
    },
    [onChangeDeadlineDate, onChangeStartDate],
  );

  const disabledStartDate = useCallback(
    (someDate: Moment) => calculateDisableDate(moment().tz(timeZone), someDate),
    [timeZone],
  );

  const disabledStartTime = useCallback(
    (someDate: Moment) => calculateDisabledTime(moment().tz(timeZone), someDate),
    [timeZone],
  );

  const onDeadlineDateChange = useCallback(
    (moment: Moment) => {
      onChangeDeadlineDate(moment.clone().tz(BASE_TIMEZONE).format());
      setDeadlineMoment(moment.clone());
    },
    [onChangeDeadlineDate],
  );

  const disabledDeadlineDate = useCallback(
    (someDate: Moment) => calculateDisableDate(startMoment, someDate),
    [startMoment],
  );

  const disabledDeadlineTime = useCallback(
    (someDate: Moment) => calculateDisabledTime(startMoment, someDate),
    [startMoment],
  );

  const onCheckboxChange = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        const deadlineMoment = startMoment.clone().add(1, 'h');
        setDeadlineMoment(deadlineMoment.clone().tz(BASE_TIMEZONE));
        onChangeDeadlineDate(deadlineMoment.clone().format());
        setIsDeadlineExist(true);
      } else {
        onChangeDeadlineDate('');
        setIsDeadlineExist(false);
      }
    },
    [onChangeDeadlineDate, startMoment],
  );

  return (
    <div>
      <Checkbox defaultChecked={isDeadlineExist} onChange={onCheckboxChange}>
        <Text strong>Add deadline date</Text>
      </Checkbox>
      <div className="mentor-mode-dates-container">
        {startMoment && (
          <div className="mentor-mode_date-container">
            <h3>Start Date and Time</h3>

            <DatePicker
              value={startMoment}
              format="DD/MM/YYYY HH:mm"
              onChange={onStartDateChange}
              disabledDate={disabledStartDate}
              disabledTime={disabledStartTime}
              showNow={false}
              showTime
              allowClear={false}
            />
          </div>
        )}

        {deadlineMoment && (
          <div className="mentor-mode_date-container">
            <h3>Deadline Date and Time</h3>
            <DatePicker
              disabled={!isDeadlineExist}
              value={deadlineMoment}
              format="DD/MM/YYYY HH:mm"
              onChange={onDeadlineDateChange}
              disabledDate={disabledDeadlineDate}
              disabledTime={disabledDeadlineTime}
              showNow={false}
              showTime
              allowClear={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
