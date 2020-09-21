import './organizer-cell.scss';

import { EditOutlined, GithubFilled } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import React, { FC } from 'react';

import { AppMode } from '../../../../../../../../models/app.models';
import { GITHUB_PREFIX, RSS_APP_PREFIX } from './organizer-cell.models';

interface IOrganizerCell {
  gitLink: string;
  onEditClick: () => void;
  appMode: AppMode;
}

export const OrganizerCell: FC<IOrganizerCell> = ({ gitLink, onEditClick, appMode }) => {
  const name = gitLink.replace(GITHUB_PREFIX, '');
  const schoolProfile = RSS_APP_PREFIX + name;

  return (
    <div className="organizer-cell_wrapper">
      <a className="organizer_name" href={schoolProfile}>
        <Avatar src={gitLink + '.png'} size="small" />
        {' ' + name}
      </a>
      {appMode === AppMode.student ? (
        <a className="organizer_gitLink" href={gitLink}>
          <GithubFilled />
        </a>
      ) : (
        <Tooltip title="Edit Organizer">
          <EditOutlined className="organizer_edit-icon" onClick={onEditClick} />
        </Tooltip>
      )}
    </div>
  );
};
