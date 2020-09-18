import { DatePicker } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Moment } from 'moment';
import momentTimeZone from 'moment-timezone';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { BASE_TIMEZONE, TimeZone } from '../../../../../../models/app.models';

interface IDateTimeModal {
  defaultDateTime: string;
  onConfirmClick: (newDateTime: string) => void;
  onCancelClick: () => void;
  defaultTimeZone: TimeZone;
  visible: boolean;
}

export const EditDateModal: FC<IDateTimeModal> = ({
  defaultDateTime,
  onConfirmClick,
  onCancelClick,
  defaultTimeZone,
  visible,
}) => {
  const [date, setDate] = useState<Moment>();

  const onDateSelect = useCallback((time: Moment) => setDate(time), []);
  const onOkClick = useCallback(() => onConfirmClick(date.tz(BASE_TIMEZONE).format()), [
    date,
    onConfirmClick,
  ]);

  useEffect(() => {
    setDate(momentTimeZone.tz(defaultDateTime, defaultTimeZone));
  }, [defaultDateTime, defaultTimeZone]);

  return (
    <Modal title="Edit Date" visible={visible} onCancel={onCancelClick} onOk={onOkClick} centered>
      <DatePicker value={date} onChange={onDateSelect} allowClear={false} />
    </Modal>
  );
};
