import { IActivity, UnitPreference } from '../../internalTypes/interfaces';
import { formatSecondsToHMS } from '../../utils/formatSecoundToHMS';
import { unitChange } from '../../utils/unitChange';
import DataTextSpan from './PhotoOrMapComponent/DataTextSpan';
import PhotoOrMapComponent from './PhotoOrMapComponent/PhotoOrMapComponent';

interface IProps {
  activity: IActivity;
  unitPreference: UnitPreference;
}

const ActivitesMap = ({ activity, unitPreference }: IProps) => {
  return (
    <div className="flex h-128 w-full flex-col items-center justify-center px-20">
      <span>
        <a
          href={`https://www.strava.com/activities/${activity.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {activity.name}
        </a>
      </span>
      {/*Map*/}
      <PhotoOrMapComponent activity={activity} className="h-96 w-full px-20" />
      <div className="grid w-full grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        {/*Distance*/}
        <DataTextSpan
          valueName="Distance"
          value={
            unitPreference == 'metric'
              ? unitChange(activity.distance, 'm', 'km').toFixed(2)
              : unitChange(activity.distance, 'm', 'mile').toFixed(2)
          }
          valueUnit={unitPreference == 'metric' ? ' km' : ' miles'}
        />
        {/*Elevation*/}
        <DataTextSpan
          valueName="Elevation"
          value={
            unitPreference == 'metric'
              ? activity.total_elevation_gain.toString()
              : unitChange(activity.total_elevation_gain, 'm', 'feet').toFixed(
                  2,
                )
          }
          valueUnit={unitPreference == 'metric' ? ' m' : ' feet'}
        />
        {/*Time*/}
        <DataTextSpan
          valueName="Time"
          value={formatSecondsToHMS(activity.moving_time)}
          valueUnit=""
        />

        {/*Average Speed*/}
        <DataTextSpan
          valueName="Average Speed"
          value={
            unitPreference == 'metric'
              ? unitChange(activity.average_speed, 'm/s', 'km/h').toFixed(2)
              : unitChange(activity.average_speed, 'm/s', 'mile/h').toFixed(2)
          }
          valueUnit={unitPreference == 'metric' ? ' km/h' : ' mile/h'}
        />
        {/*Average Pace*/}
        <DataTextSpan
          valueName="Average Pace"
          value={
            unitPreference == 'metric'
              ? unitChange(
                  activity.moving_time / activity.distance,
                  's/m',
                  'min/km',
                ).toFixed(2)
              : unitChange(
                  activity.moving_time / activity.distance,
                  's/m',
                  'min/mile',
                ).toFixed(2)
          }
          valueUnit={unitPreference == 'metric' ? ' min/km' : ' min/mile'}
        />
        {/*Elapsed time*/}
        <DataTextSpan
          valueName="Elapsed time"
          value={formatSecondsToHMS(activity.elapsed_time)}
          valueUnit=""
        />
        {/*Max Speed*/}
        <DataTextSpan
          valueName="Max Speed"
          value={
            unitPreference == 'metric'
              ? unitChange(activity.max_speed, 'm/s', 'km/h').toFixed(2)
              : unitChange(activity.max_speed, 'm/s', 'mile/h').toFixed(2)
          }
          valueUnit={unitPreference == 'metric' ? ' km/h' : ' mile/h'}
        />
        {/*Max Pace*/}
        <DataTextSpan
          valueName="Max Pace"
          value={
            unitPreference == 'metric'
              ? unitChange(
                  activity.elapsed_time / activity.distance,
                  's/m',
                  'min/km',
                ).toFixed(2)
              : unitChange(
                  activity.elapsed_time / activity.distance,
                  's/m',
                  'min/mile',
                ).toFixed(2)
          }
          valueUnit={unitPreference == 'metric' ? ' min/km' : ' min/mile'}
        />
      </div>
      {activity.sport_type == 'RIDE' ? (
        <>
          <div className="flex w-full flex-col">
            <span className="small-caps text-pb-dark-gray">
              Ride only {activity.device_watts ? '(measured)' : '(estimated)'}
            </span>
            {/*Kilojoules*/}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
              <DataTextSpan
                valueName="Kilojoules"
                value={activity.kilojoules.toString()}
                valueUnit=" kJ"
              />
              {/*Average Watts*/}
              <DataTextSpan
                valueName="Average Watts"
                value={activity.average_watts.toString()}
                valueUnit=" W"
              />

              {/*If activity was measured on dedicated device show to more fields*/}
              {activity.device_watts && (
                <>
                  {/*Max Wats*/}
                  <DataTextSpan
                    valueName="Max Watts"
                    value={activity.max_watts.toString()}
                    valueUnit=" W"
                  />
                  {/*Weighted_average_watts*/}
                  <DataTextSpan
                    valueName="Weighted Average Watts"
                    value={activity.weighted_average_watts.toString()}
                    valueUnit=" W"
                  />
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default ActivitesMap;
