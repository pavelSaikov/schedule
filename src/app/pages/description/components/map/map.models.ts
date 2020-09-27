import { IFrameSize } from '../video-list/video-list.models';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export const MINSK_COORDINATES: ICoordinates = { lat: 53.893009, lng: 27.567444 };
export const DEFAULT_MAP_SIZE: IFrameSize = { width: 900, height: 600 };
