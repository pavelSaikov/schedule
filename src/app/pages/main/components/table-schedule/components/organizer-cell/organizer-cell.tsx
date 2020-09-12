import './organizer-cell.scss';

import React, { FC } from 'react';
import { Avatar, Tooltip } from 'antd';
import { EditOutlined, GithubFilled } from '@ant-design/icons';

import { AppMode } from '../../../../../../models/app.models';

interface Organizer {
  gitLink: string;
  onEditClick: () => void;
  appMode: AppMode;
}

export const OrganizerCell: FC<Organizer> = ({ gitLink, onEditClick, appMode }) => {
  const name = gitLink.replace('https://github.com/', '');
  const schoolProfile = 'https://app.rs.school/profile?githubId=' + name;

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
