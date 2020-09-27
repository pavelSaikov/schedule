import './task-description.scss';

import Paragraph from 'antd/lib/typography/Paragraph';
import React, { useCallback, useState, FC } from 'react';

import { AppMode } from '../../../../models/app.models';

interface ITaskDescription {
  taskDescription: string;
  onDescriptionChange: (newDescription: string) => void;
  appMode: AppMode;
}

export const TaskDescription: FC<ITaskDescription> = ({ taskDescription, onDescriptionChange, appMode }) => {
  const [description, setDescription] = useState(taskDescription);

  const onChange = useCallback(
    newDescription => {
      setDescription(newDescription);
      onDescriptionChange(newDescription);
    },
    [onDescriptionChange],
  );

  return (
    <Paragraph
      className="task-description_wrapper"
      editable={
        appMode === AppMode.mentor ? { onChange: onChange, autoSize: { minRows: 5, maxRows: 35 } } : false
      }
      ellipsis={{ rows: 10, expandable: true, symbol: 'more' }}
    >
      {description}
    </Paragraph>
  );
};
