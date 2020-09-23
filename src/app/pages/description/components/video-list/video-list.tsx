import './video-list.scss';

import { Button, List } from 'antd';
import React, { useEffect, useState, FC } from 'react';

import { AppMode } from '../../../../models/app.models';
import { DEFAULT_VIDEO_SIZE, IFrameSize } from './video-list.models';
import { Video } from './video/video';

interface IVideoList {
  videoUrls: string[];
  onRemoveVideoClick: (url: string) => void;
  onAddVideoClick: () => void;
  appMode: AppMode;
}

export const VideoList: FC<IVideoList> = ({ videoUrls, onAddVideoClick, onRemoveVideoClick, appMode }) => {
  const [videoSize, setVideoSize] = useState<IFrameSize>({ ...DEFAULT_VIDEO_SIZE });

  useEffect(() => {
    const callback = () => {
      const newWidth: number = document.documentElement.clientWidth * 0.9;
      const newHeight: number = (newWidth / 16) * 9;
      const newVideoSize: IFrameSize =
        newWidth > DEFAULT_VIDEO_SIZE.width
          ? { ...DEFAULT_VIDEO_SIZE }
          : { width: newWidth, height: newHeight };

      setVideoSize(newVideoSize);
    };

    callback();

    window.addEventListener('resize', callback);

    return () => window.removeEventListener('resize', callback);
  }, []);

  return (
    <div className="video-list_wrapper">
      <List>
        {videoUrls.map(video => (
          <Video
            key={video}
            appMode={appMode}
            onRemoveClick={onRemoveVideoClick}
            videoUrl={video}
            videoSize={videoSize}
          />
        ))}
      </List>
      {appMode === AppMode.mentor && (
        <Button className="video-list_button" onClick={onAddVideoClick} type="primary">
          Add Video
        </Button>
      )}
    </div>
  );
};
