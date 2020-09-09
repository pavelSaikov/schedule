import './name-cell.scss';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState, useEffect, FC } from 'react';

import { AppMode } from '../../../../../../models/app.models';

interface INameCell {
  name: string;
  onEditClick: () => void;
  appMode: AppMode;
}

export const NameCell: FC<INameCell> = ({ name, onEditClick, appMode }) => {
  const [userName, setName] = useState<string>();

  useEffect(() => setName(name), [name]);

  return (
    <div className="name-cell_wrapper">
      <Text className="name-cell_name">{userName}</Text>
      {appMode === AppMode.mentor && (
        <Tooltip title="Edit Name">
          <EditOutlined className="name-cell_edit-icon" onClick={onEditClick} />
        </Tooltip>
      )}
    </div>
  );
};
