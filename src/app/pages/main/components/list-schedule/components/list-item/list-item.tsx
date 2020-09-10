import './list-item.scss';

import { Button } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { Tag } from '../../../../../../common/components/tag/tag';
import { TimeZone } from '../../../../../../models/app.models';
import { IListItemInfo } from '../../list-schedule.models';

interface IListItem {
  itemInfo: IListItemInfo;
  timeZone: TimeZone;
  onMoreClick: (id: string) => void;
}

export const ListItem: FC<IListItem> = ({ itemInfo, timeZone, onMoreClick }) => {
  const [dateTime, setDateTime] = useState<string>();

  useEffect(() => setDateTime(moment(itemInfo.dateTime).tz(timeZone).format('DD-MM-YYYY HH:mm')), [
    itemInfo.dateTime,
    timeZone,
  ]);

  const onMore = useCallback(() => onMoreClick(itemInfo.id), [itemInfo.id, onMoreClick]);

  return (
    <div className="list-item_wrapper">
      <div className="list-item_header-container">
        <div className="list-item_title-container">
          <Title className="list-item_header" level={3}>
            {itemInfo.title}
          </Title>
          <Tag text="text" textColor="green" backgroundColor="yellow" />
        </div>
        <Text>{dateTime}</Text>
      </div>
      <Paragraph className="list-item_description" ellipsis={{ rows: 1, expandable: true }}>
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
