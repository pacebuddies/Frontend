import { NextPage } from 'next';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeFilterRanges } from '../../internalTypes/sportTypeFilterRanges';
import RecommendationFilterRangeSlider from './RecommendationFilterRangeSlider';
import PreferenceSlider from "./PreferencesSlider";
import RangeSlider from "./RangeSlider";

pacebuddiesApi
  .get('recommender/recommendations/getFilter', {
    params: {
      sport_type: SportTypeEnum.Run,
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response);
  });

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
    <>
      <div>
        <span>Running</span>
      </div>
      <div className="w-full pt-4">
        <div className="flex flex-col pl-8">
          <PreferenceSlider/>
          <RangeSlider/>
        </div>
      </div>


      {/*<div>*/}
      {/*  <div className="w-full pt-4">*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Max Speed'}*/}
      {/*        default_max={sportData.avg_max_speed_max}*/}
      {/*        default_min={sportData.avg_max_speed_min}*/}
      {/*        user_max={sportData.avg_max_speed_max}*/}
      {/*        user_min={sportData.avg_max_speed_min}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <div className="w-1/3 border-[1px]"></div>*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Speed'}*/}
      {/*        default_max={sportData.avg_speed_max}*/}
      {/*        default_min={sportData.avg_speed_min}*/}
      {/*        user_max={sportData.avg_speed_max}*/}
      {/*        user_min={sportData.avg_speed_min}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <div className="w-1/3 border-[1px]"></div>*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Distance'}*/}
      {/*        default_max={sportData.avg_distance_max}*/}
      {/*        default_min={sportData.avg_distance_min}*/}
      {/*        user_max={sportData.avg_distance_max}*/}
      {/*        user_min={sportData.avg_distance_min}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <div className="w-1/3 border-[1px]"></div>*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Moving Time'}*/}
      {/*        default_max={sportData.avg_moving_time_max}*/}
      {/*        default_min={sportData.avg_moving_time_min}*/}
      {/*        user_max={sportData.avg_moving_time_max}*/}
      {/*        user_min={sportData.avg_moving_time_min}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <div className="w-1/3 border-[1px]"></div>*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Total Moving Time'}*/}
      {/*        default_max={sportData.avg_total_moving_time_max}*/}
      {/*        default_min={sportData.avg_total_moving_time_min}*/}
      {/*        user_max={sportData.avg_total_moving_time_max}*/}
      {/*        user_min={sportData.avg_total_moving_time_min}*/}
      {/*        scale={'large'}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <div className="w-1/3 border-[1px]"></div>*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Total Distance'}*/}
      {/*        default_max={sportData.avg_total_distance_max}*/}
      {/*        default_min={sportData.avg_total_distance_min}*/}
      {/*        user_max={sportData.avg_total_distance_max}*/}
      {/*        user_min={sportData.avg_total_distance_min}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="pt-4">*/}
      {/*    <span>Swimming</span>*/}
      {/*  </div>*/}
      {/*  <div className="pt-4">*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <div className="w-1/3 border-[1px]"></div>*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Total Distance'}*/}
      {/*        default_max={sportData.avg_total_distance_max}*/}
      {/*        default_min={sportData.avg_total_distance_min}*/}
      {/*        user_max={sportData.avg_total_distance_max}*/}
      {/*        user_min={sportData.avg_total_distance_min}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="pt-4">*/}
      {/*    <span>Riding</span>*/}
      {/*  </div>*/}
      {/*  <div className="pt-4">*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <div className="w-1/3 border-[1px]"></div>*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Total Distance'}*/}
      {/*        default_max={sportData.avg_total_distance_max}*/}
      {/*        default_min={sportData.avg_total_distance_min}*/}
      {/*        user_max={sportData.avg_total_distance_max}*/}
      {/*        user_min={sportData.avg_total_distance_min}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="pt-4">*/}
      {/*    <span>Rest</span>*/}
      {/*  </div>*/}
      {/*  <div className="pt-4">*/}
      {/*    <div className="flex flex-col pl-8">*/}
      {/*      <div className="w-1/3 border-[1px]"></div>*/}
      {/*      <RecommendationFilterRangeSlider*/}
      {/*        text={'Avg Total Distance'}*/}
      {/*        default_max={sportData.avg_total_distance_max}*/}
      {/*        default_min={sportData.avg_total_distance_min}*/}
      {/*        user_max={sportData.avg_total_distance_max}*/}
      {/*        user_min={sportData.avg_total_distance_min}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default RecommendationsPreferencesSettingsTab;
