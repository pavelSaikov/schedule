import './name-cell.scss';

import { Typography } from 'antd';
import React, { useState, useEffect, FC, useCallback } from 'react';
import { AppMode } from '../../../../../../models/app.models';

const { Paragraph } = Typography;
interface INameCell {
  name: string;
  appMode: AppMode;
  onEditClick: (value: string) => void;
}

export const NameCell: FC<INameCell> = ({ name, appMode, onEditClick }) => {
  const [userName, setName] = useState<string>(name);
  useEffect(() => setName(userName), [userName]);

  const onChange = useCallback(
    (value: string) => {
      setName(value);
      onEditClick(value);
    },
    [onEditClick],
  );
  return (
    <div className="name-cell_wrapper">
      {
        <Paragraph ellipsis={true} editable={appMode === AppMode.mentor ? { onChange: onChange } : false}>
          {userName}
        </Paragraph>
      }
    </div>
  );
};
