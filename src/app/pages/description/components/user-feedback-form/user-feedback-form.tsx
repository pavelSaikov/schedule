import './user-feedback-form.scss';

import { Button, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Text from 'antd/lib/typography/Text';
import React, { useCallback, useState, ChangeEvent, FC } from 'react';

import { AppMode } from '../../../../models/app.models';

interface IUserFeedbackForm {
  onFeedbackSubmit: (value: string) => void;
  onChangeFeedbackStatus: (value: boolean) => void;
  appMode: AppMode;
  isFeedbackEnabled: boolean;
}

export const UserFeedbackForm: FC<IUserFeedbackForm> = ({
  onFeedbackSubmit,
  onChangeFeedbackStatus,
  appMode,
  isFeedbackEnabled,
}) => {
  const [isFeedbackAvailable, setIsFeedbackAvailable] = useState(isFeedbackEnabled);
  const [feedback, setFeedback] = useState('');

  const onCheckboxChange = useCallback(
    () =>
      setIsFeedbackAvailable(value => {
        const newValue = !value;
        onChangeFeedbackStatus(newValue);
        return newValue;
      }),
    [onChangeFeedbackStatus],
  );

  const onTextAreaChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => setFeedback(event.currentTarget.value),
    [],
  );

  const onSubmit = useCallback(() => onFeedbackSubmit(feedback), [feedback, onFeedbackSubmit]);

  return (
    <div>
      {appMode === AppMode.mentor && (
        <Checkbox
          className="user-feedback-form_checkbox"
          checked={isFeedbackAvailable}
          onChange={onCheckboxChange}
        >
          <Text strong>Is feedback available</Text>
        </Checkbox>
      )}

      <TextArea rows={5} disabled={!isFeedbackAvailable} onChange={onTextAreaChange} />
      <Button
        className="user-feedback-form_button"
        type="primary"
        disabled={!isFeedbackAvailable || appMode === AppMode.mentor || !feedback}
        onClick={onSubmit}
      >
        Submit feedback
      </Button>
    </div>
  );
};
