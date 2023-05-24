import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';
import { isAllowedSportTypeNumber } from '../../utils/isAllowedSportType';
import FilterSportBlock from './FilterSportBlock';

const RecommendationsPreferencesSettingsTab: NextPage = () => {
  // const sportData: SportTypeFilterRanges = {
  //   sport_type: 26,
  //   city: 'Toruń',
  //   country: 'Poland',
  //   avg_max_speed_min: 15.92352,
  //   avg_max_speed_max: 23.88528,
  //   avg_speed_min: 5.764,
  //   avg_speed_max: 8.264,
  //   avg_distance_min: 1.661,
  //   avg_distance_max: 3.661,
  //   avg_moving_time_min: 0,
  //   avg_moving_time_max: 38.43889,
  //   avg_total_moving_time_min: 0,
  //   avg_total_moving_time_max: 600,
  //   avg_total_distance_min: 2.9829998,
  //   avg_total_distance_max: 12.983,
  //   empty: false,
  // };
  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };
  const { isSuccess, data } = useQuery({
    queryKey: ['user-sports'],
    queryFn: fetchSports,
  });

  return (
    <>
      <div>
        <span>Running</span>
      </div>
      <div className="w-full pt-4">
        <div className="flex flex-col pl-8">{/*<PreferenceSlider />*/}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {/*{isSuccess &&*/}
        {/*  data.map((sport) => {*/}
        {/*    const sportNumber = SportTypeMap.getNumber(sport)!;*/}
        {/*    if (isAllowedSportTypeNumber(sportNumber)) {*/}
        {/*      return (*/}
        {/*        <FilterSportBlock*/}
        {/*          key={sportNumber}*/}
        {/*          title={sport}*/}
        {/*          sportType={sportNumber}*/}
        {/*        />*/}
        {/*      );*/}
        {/*    } else {*/}
        {/*      return null;*/}
        {/*    }*/}
        {/*  })}*/}
        <FilterSportBlock title={'Running'} sportType={SportTypeEnum.RUN} />
        <FilterSportBlock title={'Running'} sportType={SportTypeEnum.RUN} />
        <FilterSportBlock title={'Running'} sportType={SportTypeEnum.RUN} />
        <FilterSportBlock title={'Running'} sportType={SportTypeEnum.RUN} />
      </div>
    </>
  );
};

export default RecommendationsPreferencesSettingsTab;
