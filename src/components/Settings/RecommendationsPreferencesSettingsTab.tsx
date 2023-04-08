import { NextPage } from 'next';
import { useState } from 'react';
import { SportTypeFilterRanges } from '../../internalTypes/sportTypeFilterRanges';
import RangeSlider from './RangeSlider';
import RecommendationFilterRangeSlider from './RecommendationFilterRangeSlider';

// pacebuddiesApi
//   .get('recommender/recommendations/getFilter', {
//     params: {
//       sport_type: SportTypeEnum.Run,
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err.response);
//   });

const RecommendationsPreferencesSettingsTab: NextPage = () => {

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
    <div className="w-full pt-8">
      <div className="flex flex-col pl-8">
        <RecommendationFilterRangeSlider
          text={'Avg Max Speed'}
          default_max={60}
          default_min={40}
          user_max={70}
          user_min={20}
        />
      </div>
      <div className="flex flex-col pl-8">
        <div className="w-1/3 border-[1px]"></div>
        <RecommendationFilterRangeSlider
          text={'Avg Speed'}
          default_max={40}
          default_min={20}
          user_max={70}
          user_min={10}
        />
      </div>
    </div>
  );
};

export default RecommendationsPreferencesSettingsTab;
