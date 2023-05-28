import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';
import { isAllowedSportTypeNumber } from '../../utils/isAllowedSportType';
import FilterRideTypeSportBlock from './FilterSportBlock/FilterRideTypeSportBlock';
import FilterRunTypeSportBlock from './FilterSportBlock/FilterRunTypeSportBlock';
import FilterSwimTypeSportBlock from './FilterSportBlock/FilterSwimTypeSportBlock';

const RecommendationsPreferencesSettingsTab: NextPage = () => {
  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };
  const { isSuccess, data } = useQuery({
    queryKey: ['user-sports'],
    queryFn: fetchSports,
  });

  const RUN_TYPE_SPORTS = [
    SportTypeEnum.HIKE,
    SportTypeEnum.SNOWSHOE,
    SportTypeEnum.TRAIL_RUN,
    SportTypeEnum.WALK,
    SportTypeEnum.RUN,
  ];
  const RIDE_TYPE_SPORTS = [
    SportTypeEnum.ALPINE_SKI,
    SportTypeEnum.BACKCOUNTRY_SKI,
    SportTypeEnum.E_BIKE_RIDE,
    SportTypeEnum.E_MOUNTAIN_BIKE_RIDE,
    SportTypeEnum.GRAVEL_RIDE,
    SportTypeEnum.HANDCYCLE,
    SportTypeEnum.MOUNTAIN_BIKE_RIDE,
    SportTypeEnum.RIDE,
    SportTypeEnum.ROLLER_SKI,
    SportTypeEnum.SNOWBOARD,
  ];
  const SWIM_TYPE_SPORTS = [SportTypeEnum.SWIM];

  return (
    <>
      <div>
        <span className="small-caps mt-2 flex items-center justify-center text-2xl font-bold text-pb-dark-gray">
          preferences
        </span>
        <span className="text-md  flex items-center justify-center px-2 font-bold text-pb-dark-gray ">
          Here you can adjust your recommendation&apos;s filters to the
          preferred level for each sport type.
          <br />
        </span>
        <span className="text-md flex items-center justify-center px-2 text-pb-dark-gray ">
          Under every slider you can see current range calculated from our
          algorithm and your preferences.
          <br />
          After changes remember to save your new settings.
        </span>
      </div>
      <div className="w-full pt-4">
        <div className="flex flex-col pl-8">{/*<PreferenceSlider />*/}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {isSuccess &&
          data.map((sport) => {
            const sportNumber = SportTypeMap.getNumber(sport)!;
            if (isAllowedSportTypeNumber(sportNumber)) {
              {
                /*TODO: title - podane małymi literami*/
              }
              if (SWIM_TYPE_SPORTS.includes(sportNumber)) {
                return (
                  <FilterSwimTypeSportBlock
                    key={sportNumber}
                    title={sport}
                    sportType={sportNumber}
                  />
                );
              } else if (RUN_TYPE_SPORTS.includes(sportNumber)) {
                return (
                  <FilterRunTypeSportBlock
                    key={sportNumber}
                    title={sport}
                    sportType={sportNumber}
                  />
                );
              } else if (RIDE_TYPE_SPORTS.includes(sportNumber)) {
                return (
                  <FilterRideTypeSportBlock
                    key={sportNumber}
                    title={sport}
                    sportType={sportNumber}
                  />
                );
              } else {
                return null;
              }
            } else {
              return null;
            }
          })}
      </div>
    </>
  );
};

export default RecommendationsPreferencesSettingsTab;
