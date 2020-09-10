import './name-cell.scss';

import { Typography } from 'antd';
import React, { useState, FC } from 'react';
import { AppMode } from '../../../../../../models/app.models';

const { Paragraph } = Typography;
interface INameCell {
  name: string;
  appMode: AppMode;
}

export const NameCell: FC<INameCell> = ({ name, appMode }) => {
  const [userName, setName] = useState<string>(name);

  return (
    <div className="name-cell_wrapper">
      {
        <Paragraph ellipsis={true} editable={appMode === AppMode.mentor ? { onChange: setName } : false}>
          {userName}
        </Paragraph>
      }
    </div>
  );
};
