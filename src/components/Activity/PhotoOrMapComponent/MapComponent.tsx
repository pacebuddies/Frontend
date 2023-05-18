import { PathOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import { IActivity } from '../../../internalTypes/interfaces';
import getCoordinatesFromPolyline from '../../../utils/getCoordinatesFromPolyline';

// To FIX marker if needed : https://stackoverflow.com/a/67133111

interface IMapComponentProps {
  activity: IActivity;
  pathOptions?: PathOptions;
}

const MapComponent = ({ activity, pathOptions }: IMapComponentProps) => {
  const poly = getCoordinatesFromPolyline(activity.map.summary_polyline);
  const startingPoint: [number, number] = activity.start_latlng as [number, number];
  return (
    <MapContainer
      center={startingPoint}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Data from <a href="https://www.strava.com/">Strava</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={pathOptions} positions={poly} />
    </MapContainer>
  );
};

export default MapComponent;
