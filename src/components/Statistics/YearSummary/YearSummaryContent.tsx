import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ForwardIcon,
  MapIcon,
  MapPinIcon
} from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';
import time_activity from '../../../../src/components/Statistics/YearSummary/YearSummaryIcons/time_activity.svg';
import total_distance from '../../../../src/components/Statistics/YearSummary/YearSummaryIcons/total_distance.svg';
import activity_month from '../../../../src/components/Statistics/YearSummary/YearSummaryIcons/activity_month.svg';
import distance_activity from '../../../../src/components/Statistics/YearSummary/YearSummaryIcons/distance_activity.svg';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { IYearSummary } from '../../../internalTypes/Interfaces/statisticsChartInterfaces';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../../internalTypes/SportTypeMap';
import { useSettingsStore } from '../../../store/settingsStore';
import { formatSecondsToHMS } from '../../../utils/formatSecoundToHMS';
import { unitChange } from '../../../utils/unitChange';
import YearSummaryElement from './YearSummaryElement';

interface IProps {
  selectedSport: SportTypeEnum | null;
}
const YearSummaryContent = ({ selectedSport }: IProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const fetchYearSummary = (): Promise<IYearSummary[]> => {
    return pacebuddiesApi
      .get('bridge/chart/yearsSummary', {
        params: { year: selectedYear, sport_type: selectedSport },
      })
      .then((response) => response.data);
  };

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery<
    IYearSummary[]
  >({
    queryKey: ['year-summary', selectedSport, selectedYear],
    queryFn: fetchYearSummary,
    keepPreviousData: true,
  });

  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );

  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <span className="small-caps text-xl font-bold text-pb-green ">
          Year&apos;s summary for{' '}
          {SportTypeMap.getString(selectedSport!)
            ?.toLowerCase()
            .replace(/_/g, ' ')}
        </span>
        <Dropdown
          label={selectedYear}
          outline={true}
          pill={true}
          color={'success'}
          disabled={isLoading || isFetching}
        >
          <Dropdown.Item onClick={() => setSelectedYear(2023)}>
            2023
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedYear(2022)}>
            2022
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedYear(2021)}>
            2021
          </Dropdown.Item>
        </Dropdown>
      </div>
      {/*List of summaries*/}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        {isSuccess && (
          <>
            {/*TODO Add more elements*/}
            {/*Total Time*/}
            <YearSummaryElement
              icon={<ClockIcon className="h-10 w-10 text-white" />}
              label={'Total time'}
              value={formatSecondsToHMS(data[0]?.total_moving_time ?? 0)}
            />
            {/*Activities*/}
            <YearSummaryElement
              icon={<MapIcon className="h-10 w-10 text-white" />}
              label={'Activities'}
              value={data[0]?.activity_count?.toString() ?? '0'}
            />
            {/*Time/Activity*/}
            <YearSummaryElement
              icon={
                <Image
                  src={time_activity.src}
                  alt={'time per activity'}
                  width={40}
                  height={40}
                />
              }
              label={'Time/Activity'}
              value={formatSecondsToHMS(
                (data[0]?.total_moving_time ?? 0) /
                  (data[0]?.activity_count ?? 1),
              )}
            />
            <YearSummaryElement
              icon={
                <Image
                  src={activity_month.src}
                  alt={'average activities per month'}
                  width={39}
                  height={39}
                />
              }
              label={'Activities/Month'}
              value={data[0]?.avg_activity_count_per_month?.toString() ?? '0'}
            />
            <YearSummaryElement
              icon={
                <Image
                  src={total_distance.src}
                  alt={'total distance'}
                  width={39}
                  height={39}
                />
              }
              label={'Total distance'}
              value={
                measurementPreference === 'metric'
                  ? unitChange(data[0]?.total_distance ?? 0, 'm', 'km').toFixed(
                      2,
                    ) +
                    ' ' +
                    'km'
                  : unitChange(
                      data[0]?.total_distance ?? 0,
                      'm',
                      'mile',
                    ).toFixed(2) +
                    ' ' +
                    'mi'
              }
            />
            <YearSummaryElement
              icon={
                <Image
                  src={distance_activity.src}
                  alt={'distance per activity'}
                   width={39}
                  height={39}
                />
            }
              label={'Distance/Activity'}
              value={
                measurementPreference === 'metric'
                  ? unitChange(data[0]?.avg_distance ?? 0, 'm', 'km').toFixed(
                      2,
                    ) +
                    ' ' +
                    'km'
                  : unitChange(data[0]?.avg_distance ?? 0, 'm', 'mile').toFixed(
                      2,
                    ) +
                    ' ' +
                    'mi'
              }
            />
            <YearSummaryElement
              icon={<ForwardIcon className="h-10 w-10 text-white" />}
              label={'Average pace'}
              value={
                measurementPreference === 'metric'
                  ? unitChange(
                      data[0]?.avg_pace ?? 0,
                      'min/km',
                      'min/km',
                    ).toFixed(2) +
                    ' ' +
                    'min/km'
                  : unitChange(
                      data[0]?.avg_pace ?? 0,
                      'min/km',
                      'mile/h',
                    ).toFixed(2) +
                    ' ' +
                    'min/mi'
              }
            />
            <YearSummaryElement
              icon={<MapPinIcon className="h-8 w-8 text-white" />}
              label={'Median distance'}
              value={
                measurementPreference === 'metric'
                  ? unitChange(
                      data[0]?.median_distance ?? 0,
                      'm',
                      'km',
                    ).toFixed(2) +
                    ' ' +
                    'km'
                  : unitChange(
                      data[0]?.median_distance ?? 0,
                      'm',
                      'mile',
                    ).toFixed(2) +
                    ' ' +
                    'mi'
              }
            />
            <YearSummaryElement
              icon={<ArrowTrendingUpIcon className="h-8 w-8 text-white"/>}
              label={'Total elevation high'}
              value={
                measurementPreference === 'metric'
                  ? unitChange(data[0]?.total_elev_high ?? 0, 'm', 'm').toFixed(
                      2,
                    ) +
                    ' ' +
                    'm'
                  : unitChange(
                      data[0]?.total_elev_high ?? 0,
                      'm',
                      'feet',
                    ).toFixed(2) +
                    ' ' +
                    'feet'
              }
            />
            <YearSummaryElement
              icon={<ArrowTrendingDownIcon className="h-8 w-8 text-white"/>}
              label={'total distance downhill'}
              value={
                measurementPreference === 'metric'
                  ? unitChange(
                      data[0]?.total_distance_downhill ?? 0,
                      'm',
                      'm',
                    ).toFixed(2) +
                    ' ' +
                    'm'
                  : unitChange(
                      data[0]?.total_distance_downhill ?? 0,
                      'm',
                      'feet',
                    ).toFixed(2) +
                    ' ' +
                    'feet'
              }
            />
          </>
        )}
        {isError && (
          <span className=" text-pb-dark-gray">No data available</span>
        )}
      </div>
    </>
  );
};

export default YearSummaryContent;
