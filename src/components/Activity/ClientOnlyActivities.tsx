import { useQuery } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { IActivity } from '../../internalTypes/interfaces';
import Layout from '../../Layout';
import getCoordinatesFromPolyline from '../../utils/getCoordinatesFromPolyline';

const ClientOnlyActivities = () => {
  const fetchActivities = () => {
    return pacebuddiesApi
      .get('bridge/athlete/activities')
      .then((res) => res.data);
  };

  const { data, isSuccess } = useQuery<IActivity[]>({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  });

  const datas = data ?? [];

  const poly = getCoordinatesFromPolyline(datas[0]?.map.summary_polyline ?? '');
  console.log(poly);
  return (
    <Layout>
      <div className="h-128 w-128 bg-gray-400">
        <MapContainer
          center={[52.98056, 19.07303]}
          zoom={100}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Polyline pathOptions={{ color: 'red' }} positions={poly ?? []} />
        </MapContainer>
      </div>
    </Layout>
  );
};

export default ClientOnlyActivities;
