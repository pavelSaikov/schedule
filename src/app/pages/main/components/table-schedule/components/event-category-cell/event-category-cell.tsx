import './event-category-cell.scss';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { FC } from 'react';

import { Tag } from '../../../../../../common/components';
import { AppMode, IEventCategory, RowCategoryName } from '../../../../../../models/app.models';

interface IEventCategoryCell {
  eventCategory: IEventCategory;
  onEditClick: () => void;
  appMode: AppMode;
}

export const EventCategoryCell: FC<IEventCategoryCell> = ({ eventCategory, onEditClick, appMode }) => {
  return (
    <div className="event-category-cell_wrapper">
      <Tag
        backgroundColor={eventCategory.backgroundColor}
        textColor={eventCategory.textColor}
        text={eventCategory.categoryName}
      />
      {appMode === AppMode.mentor && eventCategory.categoryName !== RowCategoryName.deadline && (
        <Tooltip title="Edit Event Category">
          <EditOutlined className="event-category-cell_edit-icon" onClick={onEditClick} />
        </Tooltip>
      )}
    </div>
  );
};
