import { NextPage } from "next";
import { SportTypeEnum } from "../../internalTypes/sportTypeEnum";
import { FilterOffset, SportTypeFilterRanges } from "../../internalTypes/sportTypeFilterRanges";
import FilterSportBlock from "./FilterSportBlock";
import { useState } from "react";

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

  return (
    <>
      <div>
        <span>Running</span>
      </div>
      <div className="w-full pt-4">
        <div className="flex flex-col pl-8">{/*<PreferenceSlider />*/}</div>
      </div>
      {/*<div className="w-full pt-4">*/}
      <div className="flex w-72 flex-col pl-2 md:pl-8">
          <FilterSportBlock title={'Running'} sportType={SportTypeEnum.RUN} />

      </div>
    </>
  );
};

export default RecommendationsPreferencesSettingsTab;
