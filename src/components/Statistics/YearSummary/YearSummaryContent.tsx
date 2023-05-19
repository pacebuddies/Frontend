import { ClockIcon, MapIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';
import time_activity from '../../../../src/components/Statistics/YearSummary/YearSummaryIcons/time_activity.svg';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { IYearSummary } from '../../../internalTypes/Interfaces/statisticsChartInterfaces';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../../internalTypes/SportTypeMap';
import { formatSecondsToHMS } from '../../../utils/formatSecoundToHMS';
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

  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <span className="font-bold text-pb-green text-xl small-caps ">
          Year&apos;s summary for{' '}
          {SportTypeMap.getString(selectedSport!)?.toLowerCase()}
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
            {/*next element*/}
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
