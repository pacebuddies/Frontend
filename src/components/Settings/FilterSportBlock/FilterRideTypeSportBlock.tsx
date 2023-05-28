import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import {
  FilterSettings,
  SportTypeFilterRanges,
} from '../../../internalTypes/sportTypeFilterRanges';
import { useSettingsStore } from '../../../store/settingsStore';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { compareOffsetAndSettings } from '../../../utils/compareOffsetAndSettings';
import { unitChange } from '../../../utils/unitChange';
import DoubleSlider from '../../Slider/DoubleSlider';

interface IProps {
  title: string;
  // filterData: SportTypeFilterRanges;
  sportType: SportTypeEnum;
}

const FilterRideTypeSportBlock = ({ title, sportType }: IProps) => {
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
  const queryClient = useQueryClient();
  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );

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

  const { data, isSuccess } = useQuery<SportTypeFilterRanges | null>({
    queryKey: ['filterData', sportType],
    queryFn: fetchSportData,
  });

  const mutation = useMutation(
    (userFilterOffset: FilterSettings) =>
      pacebuddiesApi.post(
        'recommender/recommendations/updateRecommendationsWithFilter',
        {
          ...userFilterOffset,
        },
      ),
    {
      // When mutate is called:
      onMutate: async (newFilter) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['filterData', sportType]);

        // Snapshot the previous value
        const previousValue: SportTypeFilterRanges = queryClient.getQueryData([
          'filterData',
          sportType,
        ])!;

        // Optimistically update to the new value
        queryClient.setQueryData(['filterData', sportType], {
          ...previousValue,
          filter_offset: newFilter,
        });
        toast.success('Filter saved');
        return { previousValue };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newFilter, context) => {
        console.log(err);
        queryClient.setQueryData(
          ['filterData', sportType],
          context?.previousValue,
        );
      },
      // Always refetch after error or success
      onSettled: () => {
        queryClient.invalidateQueries(['filterData', sportType]);
      },
    },
  );

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
  }, [data, isSuccess]);

  if (!isSuccess || data === null) return null;
  // console.log(data);
  const filterData = data!.filter_settings_model;
  const offsetData = data!.filter_offset;

  const saveFilter = () => {
    mutation.mutate(userFilterOffset);
  };
  return (
    <div className="flex w-full flex-col border-t-2  border-t-pb-green">
      <div>
        <span className="small-caps flex items-center justify-center pt-2 text-xl font-bold text-pb-orange">
          {capitalizeFirstLetter(title.toLowerCase())}
        </span>
      </div>
      {/*Average distance slider*/}
      <div>
        <span className="border-t border-t-pb-green px-2 font-bold text-pb-green">
          Average distance
        </span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_distance_min,
              max: userFilterOffset.avg_distance_max,
            }}
            minBracketValue={filterData.avg_distance_min}
            maxBracketValue={filterData.avg_distance_max}
            minSteps={[-4, -3.2, -2.4, -1.6, -0.8, 0]}
            maxSteps={[0, 0.8, 1.6, 2.4, 3.2, 4]}
            minStep={0.8}
            maxStep={0.8}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_distance_min: values.min,
                avg_distance_max: values.max,
              }));
            }}
            unitFrom={'km'}
            unitTo={measurementPreference === 'imperial' ? 'mile' : 'km'}
          />
        </div>
      </div>
      {/*Average max speed*/}
      <div>
        <span className="border-t border-t-pb-green px-2 font-bold text-pb-green">
          Average max speed
        </span>
        <span className="px-2 text-pb-green"></span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_max_speed_min,
              max: userFilterOffset.avg_max_speed_max,
            }}
            minBracketValue={filterData.avg_max_speed_min}
            maxBracketValue={filterData.avg_max_speed_max}
            minSteps={[-5, -4, -3, -2, -1, 0]}
            maxSteps={[0, 1, 2, 3, 4, 5]}
            minStep={1}
            maxStep={1}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_max_speed_min: values.min,
                avg_max_speed_max: values.max,
              }));
            }}
            unitFrom={'km/h'}
            unitTo={measurementPreference === 'imperial' ? 'mile/h' : 'km/h'}
          />
        </div>
      </div>
      {/*Average speed*/}
      <div>
        <span className="border-t border-t-pb-green px-2 font-bold text-pb-green">
          Average speed
        </span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_speed_min,
              max: userFilterOffset.avg_speed_max,
            }}
            minBracketValue={filterData.avg_speed_min}
            maxBracketValue={filterData.avg_speed_max}
            minSteps={[-2, -1.6, -1.2, -0.8, -0.4, 0]}
            maxSteps={[0, 0.4, 0.8, 1.2, 1.6, 2]}
            minStep={0.4}
            maxStep={0.4}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_speed_min: values.min,
                avg_speed_max: values.max,
              }));
            }}
            unitFrom={'km/h'}
            unitTo={measurementPreference === 'imperial' ? 'mile/h' : 'km/h'}
          />
        </div>
      </div>
      {/*Average moving time*/}
      <div>
        <span className="border-t border-t-pb-green px-2 font-bold text-pb-green">
          Average moving time
        </span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_moving_time_min,
              max: userFilterOffset.avg_moving_time_max,
            }}
            minBracketValue={filterData.avg_moving_time_min}
            maxBracketValue={filterData.avg_moving_time_max}
            minSteps={[-30, -24, -18, -12, -6, 0]}
            maxSteps={[0, 6, 12, 18, 24, 30]}
            minStep={6}
            maxStep={6}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_moving_time_min: values.min,
                avg_moving_time_max: values.max,
              }));
            }}
            unitFrom={'min'}
            unitTo={'min'}
          />
        </div>
      </div>
      {/*Average total moving time*/}
      <div>
        <span className="border-t border-t-pb-green px-2 font-bold text-pb-green">
          Average total moving time
        </span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_total_moving_time_min,
              max: userFilterOffset.avg_total_moving_time_max,
            }}
            minBracketValue={unitChange(
              filterData.avg_total_moving_time_min,
              'min',
              'h',
            )}
            maxBracketValue={unitChange(
              filterData.avg_total_moving_time_max,
              'min',
              'h',
            )}
            minSteps={[-5, -4, -3, -2, -1, 0]}
            maxSteps={[0, 1, 2, 3, 4, 5]}
            minStep={1}
            maxStep={1}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_total_moving_time_min: values.min,
                avg_total_moving_time_max: values.max,
              }));
            }}
            unitFrom={'h'}
            unitTo={'h'}
          />
        </div>
      </div>
      {/*Average total distance*/}
      <div>
        <span className="border-t border-t-pb-green px-2 font-bold text-pb-green">
          Average total distance
        </span>
        <div className="w-full pb-4">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_total_distance_min,
              max: userFilterOffset.avg_total_distance_max,
            }}
            minBracketValue={filterData.avg_total_distance_min}
            maxBracketValue={filterData.avg_total_distance_max}
            minSteps={[-30, -24, -18, -12, -6, 0]}
            maxSteps={[0, 6, 12, 18, 24, 30]}
            minStep={6}
            maxStep={6}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_total_distance_min: values.min,
                avg_total_distance_max: values.max,
              }));
            }}
            unitFrom={'km'}
            unitTo={measurementPreference === 'imperial' ? 'mile' : 'km'}
          />
        </div>
      </div>
      {/*Average total elevation gain*/}
      <div>
        <span className="border-t border-t-pb-green px-2 font-bold text-pb-green">
          Average total elevation gain
        </span>
        <div className="w-full">
          <DoubleSlider
            value={{
              min: userFilterOffset.avg_total_elevation_gain_min,
              max: userFilterOffset.avg_total_elevation_gain_max,
            }}
            minBracketValue={filterData.avg_total_elevation_gain_min}
            maxBracketValue={filterData.avg_total_elevation_gain_max}
            minSteps={[-200, -160, -120, -80, -40, 0]}
            maxSteps={[0, 40, 80, 120, 160, 200]}
            minStep={40}
            maxStep={40}
            onChange={(values) => {
              setUserFilterOffset((prevState) => ({
                ...prevState,
                avg_total_elevation_gain_min: values.min,
                avg_total_elevation_gain_max: values.max,
              }));
            }}
            unitFrom={'m'}
            unitTo={measurementPreference === 'imperial' ? 'feet' : 'm'}
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
export default FilterRideTypeSportBlock;
