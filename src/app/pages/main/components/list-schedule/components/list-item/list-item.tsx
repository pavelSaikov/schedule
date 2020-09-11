import './list-item.scss';

import { Button } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { Tag } from '../../../../../../common/components';
import { IListItemInfo } from '../../list-schedule.models';

interface IListItem {
  itemInfo: IListItemInfo;
  onMoreClick: (id: string) => void;
}

export const ListItem: FC<IListItem> = ({ itemInfo, onMoreClick }) => {
  const [dateTime, setDateTime] = useState<string>();

  useEffect(() => setDateTime(moment(itemInfo.dateTime).tz(itemInfo.timeZone).format('DD-MM-YYYY HH:mm')), [
    itemInfo.dateTime,
    itemInfo.timeZone,
  ]);

  const onMore = useCallback(() => onMoreClick(itemInfo.id), [itemInfo.id, onMoreClick]);

  return (
    <div className="list-item_wrapper" style={{ backgroundColor: itemInfo.eventCategory.backgroundColor }}>
      <div className="list-item_header-container">
        <div className="list-item_title-container">
          <Title className="list-item_header" level={3} style={{ color: itemInfo.eventCategory.textColor }}>
            {itemInfo.title}
          </Title>
          <Tag
            text={itemInfo.eventCategory.categoryName}
            textColor={itemInfo.eventCategory.textColor}
            backgroundColor={itemInfo.eventCategory.backgroundColor}
          />
        </div>
        <Text style={{ color: itemInfo.eventCategory.textColor }}>{dateTime}</Text>
      </div>
      <Paragraph
        className="list-item_description"
        ellipsis={{ rows: 1, expandable: false }}
        style={{ color: itemInfo.eventCategory.textColor }}
      >
        {itemInfo.description}
      </Paragraph>
      <div className="list-item_footer-container">
        <Text>Organizer Info...</Text>
        <Button type="primary" onClick={onMore}>
          More
        </Button>
      </div>
    </div>
  );
};
