import './description-header.scss';

import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React, { useCallback, useState, FC } from 'react';

import { Tag } from '../../../../common/components/tag/tag';
import { AppMode, IEventCategory } from '../../../../models/app.models';

interface IDescriptionHeader {
  appMode: AppMode;
  defaultTitle: string;
  defaultEventCategory: IEventCategory;
  onTitleEdit: (newTitle: string) => void;
  onEventCategoryEdit: (newEventCategory: IEventCategory) => void;
}

export const DescriptionHeader: FC<IDescriptionHeader> = ({
  appMode,
  defaultTitle,
  defaultEventCategory,
  onTitleEdit,
  onEventCategoryEdit,
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const [eventCategory] = useState<IEventCategory>(defaultEventCategory);
  const [isCategoryEditorVisible, setIsCategoryEditorVisible] = useState(false);

  const onTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
      onTitleEdit(newTitle);
    },
    [onTitleEdit],
  );

  // TODO
  const onEditEventCategory = useCallback(() => {
    setIsCategoryEditorVisible(true);
    onEventCategoryEdit(null);
  }, [onEventCategoryEdit]);

  const onCancel = useCallback(() => setIsCategoryEditorVisible(false), []);

  return (
    <div className="description-header_header-container">
      <Title
        className="title"
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
      {/* TODO */}
      <Modal centered visible={isCategoryEditorVisible} onCancel={onCancel} onOk={onEditEventCategory}>
        <Text>{eventCategory.backgroundColor}</Text>
      </Modal>
    </div>
  );
};
