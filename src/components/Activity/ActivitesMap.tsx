import { IActivity, UnitPreference } from '../../internalTypes/interfaces';
import { formatSecondsToHMS } from '../../utils/formatSecoundToHMS';
import { unitChange } from '../../utils/unitChange';
import PhotoOrMapComponent from './PhotoOrMapComponent/PhotoOrMapComponent';

interface IProps {
  activity: IActivity;
  unitPreference: UnitPreference;
}

const ActivitesMap = ({ activity, unitPreference }: IProps) => {
  // const activity_start_date = new Date(activity.start_date);
  console.log();

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
        <div>
          <span className="small-caps text-pb-dark-gray">Distance </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric'
              ? unitChange(activity.distance, 'm', 'km').toFixed(2)
              : unitChange(activity.distance, 'm', 'mile').toFixed(2)}
          </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric' ? ' km' : ' miles'}
          </span>
        </div>
        {/*Elevation*/}
        <div>
          <span className="small-caps text-pb-dark-gray">Elevation </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric'
              ? activity.total_elevation_gain
              : unitChange(activity.total_elevation_gain, 'm', 'feet').toFixed(
                  2,
                )}
          </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric' ? ' m' : ' feet'}
          </span>
        </div>
        {/*Time*/}
        <div>
          <span className="small-caps text-pb-dark-gray">Time </span>
          <span className="small-caps text-pb-dark-gray">
            {formatSecondsToHMS(activity.moving_time)}
          </span>
        </div>

        {/*Average Speed*/}
        <div>
          <span className="small-caps text-pb-dark-gray">Average Speed </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric'
              ? unitChange(activity.average_speed, 'm/s', 'km/h').toFixed(2)
              : unitChange(activity.average_speed, 'm/s', 'mile/h').toFixed(2)}
          </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric' ? ' km/h' : ' mile/h'}
          </span>
        </div>
        {/*Average Pace*/}
        <div>
          <span className="small-caps text-pb-dark-gray">Average Pace </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric'
              ? unitChange(
                  activity.moving_time / activity.distance,
                  's/m',
                  'min/km',
                ).toFixed(2)
              : unitChange(
                  activity.moving_time / activity.distance,
                  's/m',
                  'min/mile',
                ).toFixed(2)}
          </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric' ? ' min/km' : ' min/mile'}
          </span>
        </div>
        {/*Elapsed time*/}
        <div>
          <span className="small-caps text-pb-dark-gray">Elapsed time </span>
          <span className="small-caps text-pb-dark-gray">
            {formatSecondsToHMS(activity.elapsed_time)}
          </span>
        </div>
        {/*Max Speed*/}
        <div>
          <span className="small-caps text-pb-dark-gray">Max Speed </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric'
              ? unitChange(activity.max_speed, 'm/s', 'km/h').toFixed(2)
              : unitChange(activity.max_speed, 'm/s', 'mile/h').toFixed(2)}
          </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric' ? ' km/h' : ' mile/h'}
          </span>
        </div>
        {/*Max Pace*/}
        <div>
          <span className="small-caps text-pb-dark-gray">Max Pace </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric'
              ? unitChange(
                  activity.elapsed_time / activity.distance,
                  's/m',
                  'min/km',
                ).toFixed(2)
              : unitChange(
                  activity.elapsed_time / activity.distance,
                  's/m',
                  'min/mile',
                ).toFixed(2)}
          </span>
          <span className="small-caps text-pb-dark-gray">
            {unitPreference == 'metric' ? ' min/km' : ' min/mile'}
          </span>
        </div>
      </div>
      {activity.sport_type == 'RIDE' ? (
        <>
          <div className="flex w-full flex-col">
            <span>
              Ride only {activity.device_watts ? '(measured)' : '(estimated)'}
            </span>
            {/*Kilojoules*/}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
              <div>
                <span className="small-caps text-pb-dark-gray">
                  Kilojoules{' '}
                </span>
                <span className="small-caps text-pb-dark-gray">
                  {activity.kilojoules} kJ
                </span>
              </div>
              {/*Average Watts*/}
              <div>
                <span className="small-caps text-pb-dark-gray">
                  Average Watts{' '}
                </span>
                <span className="small-caps text-pb-dark-gray">
                  {activity.average_watts} W
                </span>
              </div>

              {/*If activity was measured on dedicated device show to more fields*/}
              {activity.device_watts && (
                <>
                  {/*Max Wats*/}
                  <div>
                    <span className="small-caps text-pb-dark-gray">
                      Max Watts{' '}
                    </span>
                    <span className="small-caps text-pb-dark-gray">
                      {activity.max_watts} W
                    </span>
                  </div>
                  {/*Weighted_average_watts*/}
                  <div>
                    <span className="small-caps text-pb-dark-gray">
                      Weighted Average Watts{' '}
                    </span>
                    <span className="small-caps text-pb-dark-gray">
                      {activity.weighted_average_watts} W
                    </span>
                  </div>
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
