import './video-list.scss';

import { Button, Carousel } from 'antd';
import React, { FC } from 'react';

import { AppMode } from '../../../../models/app.models';
import { Video } from './video/video';

interface IVideoList {
  videoUrls: string[];
  onRemoveVideoClick: (url: string) => void;
  onAddVideoClick: () => void;
  appMode: AppMode;
}

export const VideoList: FC<IVideoList> = ({ videoUrls, onAddVideoClick, onRemoveVideoClick, appMode }) => {
  return (
    <div className="video-list_wrapper">
      <Carousel className="video-list_carousel" dotPosition="bottom">
        {videoUrls.map(video => (
          <Video key={video} appMode={appMode} onRemoveClick={onRemoveVideoClick} videoUrl={video} />
        ))}
      </Carousel>
      {appMode === AppMode.mentor && (
        <Button className="video-list_button" onClick={onAddVideoClick} type="primary">
          Add Video
        </Button>
      )}
    </div>
  );
};
