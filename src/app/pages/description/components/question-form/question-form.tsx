import './question-form.scss';

import { Button, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Text from 'antd/lib/typography/Text';
import React, { useCallback, useState, ChangeEvent, FC } from 'react';

import { AppMode } from '../../../../models/app.models';

interface IQuestionForm {
  onQuestionSubmit: (value: string) => void;
  onChangeQuestionStatus: (value: boolean) => void;
  appMode: AppMode;
  isQuestionEnabled: boolean;
}

export const QuestionForm: FC<IQuestionForm> = ({
  onQuestionSubmit,
  onChangeQuestionStatus,
  appMode,
  isQuestionEnabled,
}) => {
  const [isQuestionAvailable, setIsQuestionAvailable] = useState(isQuestionEnabled);
  const [question, setQuestion] = useState('');

  const onCheckboxChange = useCallback(
    () =>
      setIsQuestionAvailable(value => {
        const newValue = !value;
        onChangeQuestionStatus(newValue);
        return newValue;
      }),
    [onChangeQuestionStatus],
  );

  const onTextAreaChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => setQuestion(event.currentTarget.value),
    [],
  );

  const onSubmit = useCallback(() => onQuestionSubmit(question), [question, onQuestionSubmit]);

  return (
    <div>
      {appMode === AppMode.mentor && (
        <Checkbox
          className="question-form_checkbox"
          checked={isQuestionAvailable}
          onChange={onCheckboxChange}
        >
          <Text strong>Is question available</Text>
        </Checkbox>
      )}
      <TextArea rows={5} disabled={!isQuestionAvailable} onChange={onTextAreaChange} />
      <Button
        className="question-form_button"
        type="primary"
        disabled={!isQuestionAvailable || appMode === AppMode.mentor || !question}
        onClick={onSubmit}
      >
        Submit question
      </Button>
    </div>
  );
};
