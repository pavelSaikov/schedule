import React, { useState, useEffect, FC } from 'react';

import { AppMode } from '../../../../../../models/app.models';
import { Anchor, Tooltip } from 'antd';
import './broadcast-url-cell.scss';

import { EditOutlined } from '@ant-design/icons';

const { Link } = Anchor;

interface IBroadcastURL {
  link: string;
  onEditClick: () => void;
  appMode: AppMode;
}

export const BroadcastURLCell: FC<IBroadcastURL> = ({ link, onEditClick, appMode }) => {
  const [URL, setUrl] = useState<string>();
  useEffect(() => setUrl(link), [link]);

  return (
    <div className="broadcast-url_wrapper">
      <Anchor affix={false}>
        <Link href={URL} title={'Broadcast URL'} />
      </Anchor>
      {appMode === AppMode.mentor && (
        <Tooltip title="Broadcast URL">
          <EditOutlined className="broadcast-cell_edit-icon" onClick={onEditClick} />
        </Tooltip>
      )}
    </div>
  );
};
