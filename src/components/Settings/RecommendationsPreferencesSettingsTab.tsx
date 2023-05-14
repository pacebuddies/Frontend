import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeFilterRanges } from '../../internalTypes/sportTypeFilterRanges';
import DoubleSlider from '../Slider/DoubleSlider';

const RecommendationsPreferencesSettingsTab: NextPage = () => {
  const fetchSportData = (): Promise<SportTypeFilterRanges> => {
    return pacebuddiesApi
      .get('recommender/recommendations/getFilter', {
        params: {
          sport_type: SportTypeEnum.Run,
        },
      })
      .then((res) => res.data);
  };

  const filterQuery = useQuery({
    queryKey: ['filterData'],
    queryFn: fetchSportData,
  });

  const sportData: SportTypeFilterRanges = {
    sport_type: 26,
    city: 'Toruń',
    country: 'Poland',
    avg_max_speed_min: 15.92352,
    avg_max_speed_max: 23.88528,
    avg_speed_min: 5.764,
    avg_speed_max: 8.264,
    avg_distance_min: 1.661,
    avg_distance_max: 3.661,
    avg_moving_time_min: 0,
    avg_moving_time_max: 38.43889,
    avg_total_moving_time_min: 0,
    avg_total_moving_time_max: 600,
    avg_total_distance_min: 2.9829998,
    avg_total_distance_max: 12.983,
    empty: false,
  };

  return (
    <>
      <div>
        <span>Running</span>
      </div>
      <div className="w-full pt-4">
        <div className="flex flex-col pl-8">{/*<PreferenceSlider />*/}</div>
      </div>
      {/*<div className="w-full pt-4">*/}
      <div className="flex w-72 flex-col pl-8">
        <DoubleSlider
          step={1}
          value={{ min: -5, max: 20 }}
          minBracketValue={10}
          maxBracketValue={60}
          minSteps={[-20, -15, -10, -5, 0]}
          maxSteps={[0, 5, 10, 15, 20]}
          minStep={5}
          maxStep={5}
          onChange={(values) => console.log(values)}
        />
      </div>
    </>
  );
};

export default RecommendationsPreferencesSettingsTab;
