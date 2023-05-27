import 'leaflet/dist/leaflet.css';
import { IActivity, UnitPreference } from '../../internalTypes/interfaces';
import ActivitesMap from './ActivitesMap';

// To FIX marker if needed : https://stackoverflow.com/a/67133111

interface IProps {
  activities: IActivity[];
  unitPreference: UnitPreference;
}

const ClientOnlyActivities = ({ activities, unitPreference }: IProps) => {
  return (
    <>
      {activities.map((activity) =>
        !activity.is_private ? (
          <ActivitesMap
            key={activity.id}
            activity={activity}
            unitPreference={unitPreference}
          />
        ) : null,
      )}
    </>
  );
};

export default ClientOnlyActivities;
