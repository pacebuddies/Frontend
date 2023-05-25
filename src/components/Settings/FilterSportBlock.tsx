import { useQuery } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import {
  FilterSettings,
  SportTypeFilterRanges,
} from '../../internalTypes/sportTypeFilterRanges';
import { compareOffsetAndSettings } from '../../utils/compareOffsetAndSettings';
import DoubleSlider from '../Slider/DoubleSlider';

interface IProps {
  title: string;
  // filterData: SportTypeFilterRanges;
  sportType: SportTypeEnum;
}

const FilterSportBlock = ({ title, sportType }: IProps) => {
  const [userFilterOffset, setUserFilterOffset] = useState<FilterSettings>({
    sport_type: sportType,
    city: '',
    country: '',
    avg_max_speed_min: 0,
    avg_max_speed_max: 0,
    avg_speed_min: 0,
    avg_speed_max: 0,
    avg_distance_min: 0,
    avg_distance_max: 0,
    avg_moving_time_min: 0,
    avg_moving_time_max: 0,
    avg_total_moving_time_min: 0,
    avg_total_moving_time_max: 0,
    avg_total_distance_min: 0,
    avg_total_distance_max: 0,
    avg_total_elevation_gain_min: 0,
    avg_total_elevation_gain_max: 0,
  });

  const fetchSportData = (): Promise<SportTypeFilterRanges | null> => {
    return pacebuddiesApi
      .get('recommender/recommendations/getFilter', {
        params: {
          sport_type: sportType,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          return null;
        }
        return res.data;
      });
  };

  const { data, isSuccess } = useQuery<SportTypeFilterRanges| null>({
    queryKey: ['filterData', sportType],
    queryFn: fetchSportData,
  });
  const setFilterOffset = () => {
    const offsetData = data!.filter_offset;
    const {
      sport_type,
      city,
      country,
      avg_max_speed_min,
      avg_max_speed_max,
      avg_speed_min,
      avg_speed_max,
      avg_distance_min,
      avg_distance_max,
      avg_moving_time_min,
      avg_moving_time_max,
      avg_total_moving_time_min,
      avg_total_moving_time_max,
      avg_total_distance_min,
      avg_total_distance_max,
      avg_total_elevation_gain_min,
      avg_total_elevation_gain_max,
    } = offsetData;
    setUserFilterOffset({
      sport_type,
      city,
      country,
      avg_max_speed_min,
      avg_max_speed_max,
      avg_speed_min,
      avg_speed_max,
      avg_distance_min,
      avg_distance_max,
      avg_moving_time_min,
      avg_moving_time_max,
      avg_total_moving_time_min,
      avg_total_moving_time_max,
      avg_total_distance_min,
      avg_total_distance_max,
      avg_total_elevation_gain_min,
      avg_total_elevation_gain_max,
    });
  };
  useEffect(() => {
    if (data == null) return;
    setFilterOffset();
  }, [data]);

  if (!isSuccess || data === null) return null;
  console.log(data);
  const filterData = data!.filter_settings_model;
  const offsetData = data!.filter_offset;

  const saveFilter = () => {
    console.log(userFilterOffset);
    pacebuddiesApi
      .post('recommender/recommendations/updateRecommendationsWithFilter', {
        ...userFilterOffset,
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex w-full flex-col border-t-2  border-t-pb-green">
      <div>
        <span className="flex pt-2 items-center justify-center text-pb-orange text-xl small-caps font-bold">{title}</span>
      </div>
      {/*Average distance slider*/}
      <div>
        <span className="px-2 text-pb-green font-bold border-t-pb-green border-t">Average distance</span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_distance_min,
              max: userFilterOffset.avg_distance_max,
            }}
            minBracketValue={filterData.avg_distance_min}
            maxBracketValue={filterData.avg_distance_max}
            minSteps={[-20, -15, -10, -5, 0]}
            maxSteps={[0, 5, 10, 15, 20]}
            minStep={5}
            maxStep={5}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_distance_min: values.min,
                avg_distance_max: values.max,
              }));
            }}
          />
        </div>
      </div>
      {/*Average max speed*/}
      <div>
        <span className="px-2 text-pb-green font-bold border-t-pb-green border-t">Average max speed</span>
        <span className="px-2 text-pb-green"></span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_max_speed_min,
              max: userFilterOffset.avg_max_speed_max,
            }}
            minBracketValue={filterData.avg_max_speed_min}
            maxBracketValue={filterData.avg_max_speed_max}
            minSteps={[-20, -15, -10, -5, 0]}
            maxSteps={[0, 5, 10, 15, 20]}
            minStep={5}
            maxStep={5}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_max_speed_min: values.min,
                avg_max_speed_max: values.max,
              }));
            }}
          />
        </div>
      </div>
      {/*Average speed*/}
      <div>
        <span className="px-2 text-pb-green font-bold border-t-pb-green border-t">Average speed</span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_speed_min,
              max: userFilterOffset.avg_speed_max,
            }}
            minBracketValue={filterData.avg_speed_min}
            maxBracketValue={filterData.avg_speed_max}
            minSteps={[-20, -15, -10, -5, 0]}
            maxSteps={[0, 5, 10, 15, 20]}
            minStep={5}
            maxStep={5}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_speed_min: values.min,
                avg_speed_max: values.max,
              }));
            }}
          />
        </div>
      </div>
      {/*Average moving time*/}
      <div>
        <span className="px-2 text-pb-green font-bold border-t-pb-green border-t">Average moving time</span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_moving_time_min,
              max: userFilterOffset.avg_moving_time_max,
            }}
            minBracketValue={filterData.avg_moving_time_min}
            maxBracketValue={filterData.avg_moving_time_max}
            minSteps={[-20, -15, -10, -5, 0]}
            maxSteps={[0, 5, 10, 15, 20]}
            minStep={5}
            maxStep={5}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_moving_time_min: values.min,
                avg_moving_time_max: values.max,
              }));
            }}
          />
        </div>
      </div>
      {/*Average total moving time*/}
      <div>
        <span className="px-2 text-pb-green font-bold border-t-pb-green border-t">Average total moving time</span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_total_moving_time_min,
              max: userFilterOffset.avg_total_moving_time_max,
            }}
            minBracketValue={filterData.avg_total_moving_time_min}
            maxBracketValue={filterData.avg_total_moving_time_max}
            minSteps={[-20, -15, -10, -5, 0]}
            maxSteps={[0, 5, 10, 15, 20]}
            minStep={5}
            maxStep={5}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_total_moving_time_min: values.min,
                avg_total_moving_time_max: values.max,
              }));
            }}
          />
        </div>
      </div>
      {/*Average total distance*/}
      <div>
        <span className="px-2 text-pb-green font-bold border-t-pb-green border-t">Average total distance</span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_total_distance_min,
              max: userFilterOffset.avg_total_distance_max,
            }}
            minBracketValue={filterData.avg_total_distance_min}
            maxBracketValue={filterData.avg_total_distance_max}
            minSteps={[-20, -15, -10, -5, 0]}
            maxSteps={[0, 5, 10, 15, 20]}
            minStep={5}
            maxStep={5}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_total_distance_min: values.min,
                avg_total_distance_max: values.max,
              }));
            }}
          />
        </div>
      </div>
      {/*Average total elevation gain*/}
      <div>
        <span className="px-2 text-pb-green font-bold border-t-pb-green border-t">Average total elevation gain</span>
        <div className="w-full">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_total_elevation_gain_min,
              max: userFilterOffset.avg_total_elevation_gain_max,
            }}
            minBracketValue={filterData.avg_total_elevation_gain_min}
            maxBracketValue={filterData.avg_total_elevation_gain_max}
            minSteps={[-20, -15, -10, -5, 0]}
            maxSteps={[0, 5, 10, 15, 20]}
            minStep={5}
            maxStep={5}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_total_elevation_gain_min: values.min,
                avg_total_elevation_gain_max: values.max,
              }));
            }}
          />
        </div>
      </div>
      <div className="flex items-end justify-end pr-4">
        <Button
          color="success"
          disabled={compareOffsetAndSettings(offsetData, userFilterOffset)}
          onClick={saveFilter}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default FilterSportBlock;
