import { decode } from '@mapbox/polyline';

/**
 * Returns an array of coordinates from a polyline
 * @param polyline polyline string
 */
const getCoordinatesFromPolyline = (polyline: string) => {
  return decode(polyline);
};
export default getCoordinatesFromPolyline;
