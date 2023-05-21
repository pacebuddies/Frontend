import { useState } from 'react';
import { IActivity, UnitPreference } from '../../internalTypes/interfaces';
import { formatSecondsToHMS } from '../../utils/formatSecoundToHMS';
import { unitChange } from '../../utils/unitChange';
import DataTextSpan from './PhotoOrMapComponent/DataTextSpan';
import PhotoOrMapButton from './PhotoOrMapComponent/PhotoOrMapButton';
import PhotoOrMapComponent from './PhotoOrMapComponent/PhotoOrMapComponent';
import { SportTypeMap } from "../../internalTypes/SportTypeMap";

interface IProps {
  activity: IActivity;
  unitPreference: UnitPreference;
}

const ActivitesMap = ({ activity, unitPreference }: IProps) => {
  const [showMap, setShowMap] = useState<boolean>(activity.map.summary_polyline != '');
  const isMap = activity.map.summary_polyline != '';
  const isPhotos = activity.photos.length > 0;
  const handlePhotoOrMapButtonClick = () => {
    if (isMap && isPhotos) {
      setShowMap((prevState) => !prevState);
    }
  };
  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
  };
  return (
    <div className="mt-2 flex h-128 w-full flex-col items-center justify-center px-20">
      {/*Name*/}
      <div className="flex w-full items-start">
        {/*TODO:Add type of sport*/}
        {capitalizeFirstLetter(activity.sport_type.toLowerCase())}
        <span className="text-xl text-pb-green">
          <a
            href={`https://www.strava.com/activities/${activity.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {activity.name}
          </a>
        </span>
      </div>
      <PhotoOrMapButton
        isMap={isMap}
        isPhotos={isPhotos}
        onClick={handlePhotoOrMapButtonClick}
      />
      {/*Map*/}
      {(isMap || isPhotos) && (
        <PhotoOrMapComponent
          showMap={showMap}
          activity={activity}
          className="h-96 w-full"
        />
      )}
      <div className="mb-1 flex w-full border-b border-b-pb-green pt-1 md:w-3/4" />
      <div className="grid grid-cols-2 gap-2 md:w-3/4 xl:grid-cols-3 2xl:grid-cols-4 ">
        {/*Distance*/}
        <DataTextSpan
          valueName="distance"
          value={
            unitPreference == 'metric'
              ? unitChange(activity.distance, 'm', 'km').toFixed(2)
              : unitChange(activity.distance, 'm', 'mile').toFixed(2)
          }
          valueUnit={unitPreference == 'metric' ? ' km' : ' miles'}
        />
        {/*Elevation*/}
        <DataTextSpan
          valueName="elevation"
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
          valueName="time"
          value={formatSecondsToHMS(activity.moving_time)}
          valueUnit=""
        />

        {/*Average Speed*/}
        <DataTextSpan
          valueName="average speed"
          value={
            unitPreference == 'metric'
              ? unitChange(activity.average_speed, 'm/s', 'km/h').toFixed(2)
              : unitChange(activity.average_speed, 'm/s', 'mile/h').toFixed(2)
          }
          valueUnit={unitPreference == 'metric' ? ' km/h' : ' mile/h'}
        />
        {/*Average Pace*/}
        <DataTextSpan
          valueName="average pace"
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
          valueName="elapsed time"
          value={formatSecondsToHMS(activity.elapsed_time)}
          valueUnit=""
        />
        {/*Max Speed*/}
        <DataTextSpan
          valueName="max speed"
          value={
            unitPreference == 'metric'
              ? unitChange(activity.max_speed, 'm/s', 'km/h').toFixed(2)
              : unitChange(activity.max_speed, 'm/s', 'mile/h').toFixed(2)
          }
          valueUnit={unitPreference == 'metric' ? ' km/h' : ' mile/h'}
        />
        {/*Max Pace*/}
        <DataTextSpan
          valueName="max pace"
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
          <div className="flex w-full flex-col items-center justify-center">
            <div className="mb-1 flex w-full border-b border-b-pb-green pt-1 md:w-3/4" />
            <span className="small-caps font-bold text-pb-green">
              ride only {activity.device_watts ? '(measured)' : '(estimated)'}
            </span>
            {/*Kilojoules*/}
            <div className="grid grid-cols-2 gap-2 md:w-3/4 xl:grid-cols-3 2xl:grid-cols-4">
              <DataTextSpan
                valueName="kilojoules"
                value={activity.kilojoules.toString()}
                valueUnit=" kj"
              />
              {/*Average Watts*/}
              <DataTextSpan
                valueName="average watts"
                value={activity.average_watts.toString()}
                valueUnit=" w"
              />

              {/*If activity was measured on dedicated device show to more fields*/}
              {activity.device_watts && (
                <>
                  {/*Max Wats*/}
                  <DataTextSpan
                    valueName="max watts"
                    value={activity.max_watts.toString()}
                    valueUnit=" w"
                  />
                  {/*Weighted_average_watts*/}
                  <DataTextSpan
                    valueName="weighted average watts"
                    value={activity.weighted_average_watts.toString()}
                    valueUnit=" w"
                  />
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
      <div className="mt-2 flex w-full border-b-2 border-b-pb-green" />
    </div>
  );
};
export default ActivitesMap;
