import './edit-time-modal.scss';

import { Select, TimePicker } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Moment } from 'moment';
import momentTimeZone from 'moment-timezone';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { BASE_TIMEZONE, TimeZone, TimeZones } from '../../../../../../models/app.models';

interface IEditTimeModal {
  defaultDateTime: string;
  onConfirmClick: (newDateTime: string) => void;
  onCancelClick: () => void;
  defaultTimeZone: TimeZone;
  visible: boolean;
}

export const EditTimeModal: FC<IEditTimeModal> = ({
  defaultDateTime,
  onConfirmClick,
  onCancelClick,
  defaultTimeZone,
  visible,
}) => {
  const [time, setTime] = useState<Moment>();
  const [timeZone, setTimeZone] = useState(defaultTimeZone);
  const [prevTimeZone, setPrevTimeZone] = useState(defaultTimeZone);

  const onTimeZoneSelect = useCallback((newTimeZone: TimeZone) => setTimeZone(newTimeZone), []);
  const onTimeSelect = useCallback((time: Moment) => setTime(time), []);
  const onOkClick = useCallback(() => onConfirmClick(time.tz(BASE_TIMEZONE).format()), [
    time,
    onConfirmClick,
  ]);

  useEffect(() => {
    setTime(momentTimeZone.tz(defaultDateTime, defaultTimeZone));
  }, [defaultDateTime, defaultTimeZone]);

  useEffect(() => {
    if (prevTimeZone === timeZone) {
      return;
    }

    setTime(time.clone().tz(timeZone));
    setPrevTimeZone(timeZone);
  }, [timeZone, prevTimeZone, time]);

  return (
    <Modal title="Edit Time" visible={visible} onCancel={onCancelClick} onOk={onOkClick} centered>
      <Select defaultValue={timeZone} onChange={onTimeZoneSelect} className="edit-time-modal_timezone-select">
        {TimeZones.map(tz => (
          <Select.Option key={tz} value={tz}>
            {tz}
          </Select.Option>
        ))}
      </Select>
      <TimePicker value={time} format="HH:mm" onChange={onTimeSelect} />
    </Modal>
  );
};
