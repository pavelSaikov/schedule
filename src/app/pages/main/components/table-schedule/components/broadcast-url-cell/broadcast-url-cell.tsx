import './broadcast-url-cell.scss';

import { EditOutlined } from '@ant-design/icons';
import { Anchor, Tooltip } from 'antd';
import React, { useState, useEffect, FC } from 'react';

import { AppMode } from '../../../../../../models/app.models';

interface IBroadcastURL {
  link: string;
  name: string;
  onEditClick: () => void;
  appMode: AppMode;
}

export const BroadcastURLCell: FC<IBroadcastURL> = ({ link, onEditClick, appMode }) => {
  const [URL, setUrl] = useState<string>();

  useEffect(() => setUrl(link), [link]);

  return (
    <div className="broadcast-url_wrapper">
      <Anchor affix={false}>
        <Anchor.Link href={URL} title={URL} />
      </Anchor>
      {appMode === AppMode.mentor && (
        <Tooltip title={URL}>
          <EditOutlined className="broadcast-url-cell_edit-icon" onClick={onEditClick} />
        </Tooltip>
      )}
    </div>
  );
};
