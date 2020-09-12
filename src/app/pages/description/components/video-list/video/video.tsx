import './video.scss';

import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { AppMode } from '../../../../../models/app.models';

interface IVideo {
  videoUrl: string;
  appMode: AppMode;
  onRemoveClick: (videoUrl: string) => void;
}

export const Video: FC<IVideo> = ({ videoUrl, appMode, onRemoveClick }) => {
  const [frameUrl, setFrameUrl] = useState<string>();

  useEffect(() => {
    const start: number = videoUrl.indexOf('=');
    setFrameUrl(`https://www.youtube.com/embed/${videoUrl.slice(start + 1)}`);
  }, [videoUrl]);

  const onRemove = useCallback(() => onRemoveClick(videoUrl), [onRemoveClick, videoUrl]);

  return (
    <div className="video_wrapper">
      <iframe
        width="608"
        height="342"
        frameBorder="no"
        src={frameUrl}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      ></iframe>
      {appMode === AppMode.mentor && (
        <Tooltip title="Remove Video">
          <DeleteOutlined className="video_icon" onClick={onRemove} />
        </Tooltip>
      )}
    </div>
  );
};
