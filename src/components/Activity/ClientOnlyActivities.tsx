import { useQuery } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { IActivity } from '../../internalTypes/interfaces';
import { useSettingsStore } from '../../store/settingsStore';
import ActivitesMap from './ActivitesMap';

// To FIX marker if needed : https://stackoverflow.com/a/67133111

const ClientOnlyActivities = () => {
  const settingStore = useSettingsStore((store) => store.settings);

  const fetchActivities = () => {
    return pacebuddiesApi
      .get('bridge/athlete/activities')
      .then((res) => res.data);
  };

  const { data, isSuccess } = useQuery<IActivity[]>({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  });
  console.log(data);
  return (
    <>
      {isSuccess
        ? data.map((activity) =>
            !activity.is_private ? (
              <ActivitesMap
                key={activity.id}
                activity={activity}
                unitPreference={settingStore.measurementUnits}
              />
            ) : null,
          )
        : null}
    </>
  );
};

export default ClientOnlyActivities;
