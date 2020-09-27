import './photo-list.scss';

import React, { FC, useEffect, useRef, useState } from 'react';
import { Carousel, Image, Tooltip, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { AppMode } from '../../../../models/app.models';
import { maxSlidersNumber, maxPhotoWidth } from './photo-list.models';

interface IPhoto {
  photoUrls: string[];
  onRemovePhotoClick: (url: string) => void;
  onAddPhotoClick: () => void;
  appMode: AppMode;
}

export const PhotoList: FC<IPhoto> = ({ photoUrls, onRemovePhotoClick, onAddPhotoClick, appMode }) => {
  const slider = useRef(null);
  const [photos, setPhotos] = useState<string[]>(photoUrls);
  const [slidesShowNumber, setSlidesShowNumber] = useState<number>(0);
  const [maxWidth, setMaxWidth] = useState<number>(0);

  useEffect(() => {
    if (photoUrls.length <= maxSlidersNumber) {
      setMaxWidth(maxPhotoWidth * photoUrls.length);
      return;
    }

    setMaxWidth(0);
  }, [photoUrls.length]);

  useEffect(() => {
    if (!photoUrls.length) {
      return;
    }

    if (photoUrls.length === photos.length) {
      return;
    }

    setPhotos(photoUrls);
  }, [photoUrls, photos.length]);

  useEffect(() => {
    if (slidesShowNumber === photoUrls.length) {
      return;
    }

    if (photoUrls.length > maxSlidersNumber) {
      setSlidesShowNumber(maxSlidersNumber);
      return;
    }

    setSlidesShowNumber(photoUrls.length);
  }, [photoUrls.length, slidesShowNumber]);

  return (
    <div>
      {photoUrls.length === 0 ? null : (
        <div style={{ maxWidth: `${maxWidth === 0 ? 'auto' : maxWidth}px` }}>
          <Carousel
            ref={slider}
            dots={true}
            infinite={false}
            slidesToShow={slidesShowNumber}
            slidesToScroll={1}
            centerMode={false}
            arrows={false}
            variableWidth={false}
            responsive={[
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: slidesShowNumber > 3 ? 3 : slidesShowNumber,
                },
              },
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: slidesShowNumber > 2 ? 2 : slidesShowNumber,
                },
              },
            ]}
          >
            {photos.map(photoLink => (
              <div className="photo_wrapper photo_wrapper--size" key={Date.now()}>
                <Image className="photoList_photo" src={photoLink} />
                {appMode === AppMode.mentor && (
                  <Tooltip title="Delete photo">
                    <CloseCircleOutlined
                      className="photoList_deleteIcon"
                      onClick={() => onRemovePhotoClick(photoLink)}
                    />
                  </Tooltip>
                )}
              </div>
            ))}
          </Carousel>
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
