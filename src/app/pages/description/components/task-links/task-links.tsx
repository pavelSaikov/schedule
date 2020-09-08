import './task-links.scss';

import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, List, Space, Tooltip } from 'antd';
import Item from 'antd/lib/list/Item';
import Link from 'antd/lib/typography/Link';
import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';

import { AppMode, ILinkWithDescription } from '../../../../models/app.models';
import { LinkEditor } from '../link-editor/link-editor';

interface ITaskLinks {
  taskLinks: ILinkWithDescription[];
  onModifyLinks: (links: ILinkWithDescription[]) => void;
  appMode: AppMode;
}

export const TaskLinks: FC<ITaskLinks> = ({ taskLinks, appMode, onModifyLinks }) => {
  const [links, setLinks] = useState<ILinkWithDescription[]>(taskLinks.map(link => ({ ...link })));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [indexOfEditableLink, setIndexOfEditableLink] = useState(-1);

  useEffect(() => setLinks(taskLinks.map(link => ({ ...link }))), [taskLinks]);

  const onEditLinkClick = useCallback((index: number) => {
    setIndexOfEditableLink(index);
    setIsModalVisible(true);
  }, []);

  const onAddLinkClick = useCallback(() => onEditLinkClick(-1), [onEditLinkClick]);

  const onSubmitModalClick = useCallback(
    (link: ILinkWithDescription) => {
      setIsModalVisible(false);

      const newLinks: ILinkWithDescription[] = [...links];
      indexOfEditableLink === -1 ? newLinks.push(link) : newLinks.splice(indexOfEditableLink, 1, link);

      setLinks(newLinks);
      onModifyLinks(newLinks.map(link => ({ ...link })));
    },
    [indexOfEditableLink, links, onModifyLinks],
  );

  const onCancelModalClick = useCallback(() => setIsModalVisible(false), []);

  const onRemoveLink = useCallback(
    (index: number) => {
      const newLinks: ILinkWithDescription[] = links.filter((_v, i) => i !== index);
      setLinks(newLinks);
      onModifyLinks(newLinks.map(link => ({ ...link })));
    },
    [links, onModifyLinks],
  );

  const renderItem = useCallback(
    (link: ILinkWithDescription, index: number) => (
      <Item>
        <Link href={link.url}>{link.linkDescription}</Link>
        {appMode === AppMode.mentor && (
          <Space size="middle">
            <Tooltip title="Edit Link">
              <EditOutlined className="task-links_icon" onClick={() => onEditLinkClick(index)} />
            </Tooltip>
            <Tooltip title="Delete Link">
              <CloseOutlined className="task-links_icon" onClick={() => onRemoveLink(index)} />
            </Tooltip>
          </Space>
        )}
      </Item>
    ),
    [appMode, onEditLinkClick, onRemoveLink],
  );

  const footer = useMemo(
    () =>
      appMode === AppMode.mentor ? (
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddLinkClick}>
          Add Link
        </Button>
      ) : null,
    [appMode, onAddLinkClick],
  );

  return (
    <>
      <List dataSource={links} renderItem={renderItem} bordered footer={footer} />
      <LinkEditor
        isVisible={isModalVisible}
        linkWithDescription={indexOfEditableLink === -1 ? null : { ...links[indexOfEditableLink] }}
        onCancelClick={onCancelModalClick}
        onSubmitClick={onSubmitModalClick}
      />
    </>
  );
};
