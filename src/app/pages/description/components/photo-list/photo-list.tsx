import './photo-list.scss';

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Carousel, Image, Tooltip, Button } from 'antd';
import { CloseCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AppMode } from '../../../../models/app.models';
import { errorImage, slidersNumber } from './photo-list.models';

interface IPhoto {
  photoUrls: string[];
  onRemovePhotoClick: (url: string) => void;
  onAddPhotoClick: () => void;
  appMode: AppMode;
}

export const PhotoList: FC<IPhoto> = ({ photoUrls, onRemovePhotoClick, onAddPhotoClick, appMode }) => {
  const slider = useRef(null);
  const [photos, setPhotos] = useState<string[]>(new Array(slidersNumber).fill(''));

  useEffect(() => {
    if (!photoUrls.length) {
      return;
    }
    if (photoUrls.length >= slidersNumber + 1) {
      setPhotos(photoUrls);
      return;
    }
    setPhotos([...photoUrls, ...new Array(slidersNumber + 1 - photoUrls.length).fill('')]);
  }, [photoUrls]);

  const nextPhoto = useCallback(() => slider.current.slick.slickNext(), []);
  const previousPhoto = useCallback(() => slider.current.slick.slickPrev(), []);

  return (
    <div className="photoList_wrapper">
      {photoUrls.length === 0 ? null : (
        <div className="photoList_slider">
          <Tooltip title="Previous photo">
            <LeftOutlined className="photoList_arrow" onClick={() => previousPhoto()} />
          </Tooltip>
          <Carousel
            className="photoList_carousel"
            ref={slider}
            dots={false}
            infinite={false}
            slidesToShow={slidersNumber}
            slidesToScroll={1}
            arrows={false}
          >
            {photos.map(photoLink =>
              photoLink === '' ? (
                <div key={Date.now()}>
                  <Image className="photoList_photo--size" src="error" fallback={errorImage} />
                </div>
              ) : (
                <div className="photoList_slide" key={Date.now()}>
                  <Image className="photoList_photo photoList_photo--size" src={photoLink} />
                  {appMode === AppMode.mentor && (
                    <Tooltip title="Delete photo">
                      <CloseCircleOutlined
                        className="photoList_deleteIcon"
                        onClick={() => onRemovePhotoClick(photoLink)}
                      />
                    </Tooltip>
                  )}
                </div>
              ),
            )}
          </Carousel>
          <Tooltip title="Next photo">
            <RightOutlined className="photoList_arrow" onClick={() => nextPhoto()} />
          </Tooltip>
        </div>
      )}
      {appMode === AppMode.mentor && (
        <Button className="video-list_button" onClick={onAddPhotoClick} type="primary">
          Add Photo
        </Button>
      )}
    </div>
  );
};
