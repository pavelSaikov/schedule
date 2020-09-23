import './description-header.scss';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Title from 'antd/lib/typography/Title';
import cloneDeep from 'lodash.clonedeep';
import React, { useCallback, useState, FC, useEffect } from 'react';

import { ColorsEditor, Tag } from '../../../../common/components';
import { AppMode, IEventCategory } from '../../../../models/app.models';

interface IDescriptionHeader {
  appMode: AppMode;
  defaultTitle: string;
  defaultEventCategory: IEventCategory;
  availableEventCategories: IEventCategory[];
  onTitleEdit: (newTitle: string) => void;
  onEventCategoryEdit: (otherEventCategories: IEventCategory[], taskEventCategory: IEventCategory) => void;
}

export const DescriptionHeader: FC<IDescriptionHeader> = ({
  appMode,
  defaultTitle,
  defaultEventCategory,
  availableEventCategories,
  onTitleEdit,
  onEventCategoryEdit,
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const [eventCategory, setEventCategory] = useState<IEventCategory>(defaultEventCategory);
  const [isCategoryEditorVisible, setIsCategoryEditorVisible] = useState(false);

  useEffect(() => setEventCategory(defaultEventCategory), [defaultEventCategory]);

  const onTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
      onTitleEdit(newTitle);
    },
    [onTitleEdit],
  );

  const onEditEventCategory = useCallback(() => {
    setIsCategoryEditorVisible(true);
  }, []);

  const onCancel = useCallback(() => setIsCategoryEditorVisible(false), []);

  const onOkClick = useCallback(
    (updatedEventCategories: IEventCategory[], selectedEventCategory: IEventCategory) => {
      setIsCategoryEditorVisible(false);
      setEventCategory({ ...selectedEventCategory });
      onEventCategoryEdit(cloneDeep(updatedEventCategories), { ...selectedEventCategory });
    },
    [onEventCategoryEdit],
  );

  return (
    <div className="description-header_header-container">
      <Title
        className="description-header_title"
        editable={appMode === AppMode.mentor ? { onChange: onTitleChange, autoSize: { maxRows: 1 } } : false}
        ellipsis={{ rows: 1 }}
        level={2}
      >
        {title}
      </Title>
      <div className="description-header_tag-container">
        <Tag
          text={eventCategory.categoryName}
          backgroundColor={eventCategory.backgroundColor}
          textColor={eventCategory.textColor}
        />
        {appMode === AppMode.mentor && (
          <Tooltip title="Edit Event Category" placement="topRight">
            <EditOutlined className="icon" onClick={onEditEventCategory} />
          </Tooltip>
        )}
      </div>
      <ColorsEditor
        isUserCanAddNewCategories={true}
        defaultEventCategories={availableEventCategories}
        currentEventCategory={defaultEventCategory}
        onCancelClick={onCancel}
        onOkClick={onOkClick}
        isVisible={isCategoryEditorVisible}
      />
    </div>
  );
};
