import './tag.scss';

import Text from 'antd/lib/typography/Text';
import React, { FC } from 'react';

interface ITag {
  text: string;
  textColor: string;
  backgroundColor: string;
}

export const Tag: FC<ITag> = ({ text, textColor, backgroundColor }) => {
  return (
    <div className="tag" style={{ backgroundColor, borderColor: textColor }}>
      <Text strong style={{ color: textColor }} ellipsis>
        {text}
      </Text>
    </div>
  );
};
