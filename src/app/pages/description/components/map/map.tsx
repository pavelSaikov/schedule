import './map.scss';

import { Button } from 'antd';
import mapboxgl from 'mapbox-gl';
import React, { useCallback, useEffect, useRef, useState, FC } from 'react';

import { config } from '../../../../config';
import { AppMode } from '../../../../models/app.models';
import { IFrameSize } from '../video-list/video-list.models';
import { DEFAULT_MAP_SIZE, ICoordinates, MINSK_COORDINATES } from './map.models';

interface IMap {
  markerCoordinates: ICoordinates;
  appMode: AppMode;
  onCoordinatesChange: (coordinates: ICoordinates) => void;
}

export const Map: FC<IMap> = ({ markerCoordinates, appMode, onCoordinatesChange }) => {
  const [defaultData] = useState({ markerCoordinates, appMode });
  const [isMarkerVisible, setIsMarkerVisible] = useState(false);
  const [marker, setMarker] = useState(null);
  const [mapSizes, setMapSizes] = useState<IFrameSize>(DEFAULT_MAP_SIZE);
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = config.MAP_API_KEY;
    mapRef.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      zoom: 10,
    });

    mapRef.current.setCenter(defaultData.markerCoordinates || MINSK_COORDINATES);
  }, [defaultData]);

  useEffect(() => {
    const lngLat = defaultData.markerCoordinates
      ? [defaultData.markerCoordinates.lng, defaultData.markerCoordinates.lat]
      : [MINSK_COORDINATES.lng, MINSK_COORDINATES.lat];

    const newMarker = new mapboxgl.Marker({ draggable: defaultData.appMode === AppMode.mentor }).setLngLat(
      lngLat,
    );
    setIsMarkerVisible(defaultData.markerCoordinates !== null);

    setMarker(prevMarker => {
      if (prevMarker) {
        prevMarker.remove();
      }

      return newMarker;
    });
  }, [defaultData]);

  useEffect(() => {
    const callback = () => {
      const newWidth: number = document.documentElement.clientWidth * 0.9;
      const newHeight: number = (newWidth / 3) * 2;
      const newMapSize: IFrameSize =
        newWidth > DEFAULT_MAP_SIZE.width ? { ...DEFAULT_MAP_SIZE } : { width: newWidth, height: newHeight };

      setMapSizes(newMapSize);
    };

    callback();

    window.addEventListener('resize', callback);

    return () => window.removeEventListener('resize', callback);
  }, []);

  useEffect(() => {
    if (!marker) {
      return;
    }

    marker.on('dragend', () => onCoordinatesChange(marker.getLngLat()));
  }, [marker, onCoordinatesChange]);

  useEffect(() => {
    if (!marker) {
      return;
    }

    marker.setDraggable(appMode === AppMode.mentor);
  }, [appMode, marker]);

  useEffect(() => {
    if (!marker) {
      return;
    }

    isMarkerVisible ? marker.addTo(mapRef.current) : marker.remove();
  }, [isMarkerVisible, marker]);

  const onRemoveMarker = useCallback(() => {
    setIsMarkerVisible(false);
    onCoordinatesChange(null);
  }, [onCoordinatesChange]);

  const onAddMarker = useCallback(() => {
    setIsMarkerVisible(true);
    const { lng, lat } = mapRef.current.getCenter();
    marker.setLngLat([lng, lat]);
    onCoordinatesChange({ lng, lat });
  }, [marker, onCoordinatesChange]);

  return (
    <div className="map_wrapper">
      <div
        id="map"
        className="map_map-container"
        style={{ width: mapSizes.width, height: mapSizes.height }}
      ></div>
      {appMode === AppMode.mentor && (
        <Button
          className="map_button"
          type="primary"
          onClick={isMarkerVisible ? onRemoveMarker : onAddMarker}
        >
          {isMarkerVisible ? 'Remove Marker' : 'Add Marker'}
        </Button>
      )}
    </div>
  );
};
