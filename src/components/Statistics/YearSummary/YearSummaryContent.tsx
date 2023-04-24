import { ClockIcon, MapIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';
import time_activity from '../../../../src/components/Statistics/YearSummary/YearSummaryIcons/time_activity.svg';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { IYearSummary } from '../../../internalTypes/interfaces';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import YearSummaryElement from './YearSummaryElement';

interface IProps {
  selectedSport: SportTypeEnum | null;
}
const YearSummaryContent = ({ selectedSport }: IProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  console.log(selectedSport);
  const fetchYearSummary = (): Promise<IYearSummary[]> => {
    return pacebuddiesApi
      .get('bridge/chart/yearsSummary', {
        params: { year: selectedYear, sport_type: selectedSport },
      })
      .then((response) => response.data);
  };

  const { data, isError, isLoading, isSuccess } = useQuery<IYearSummary[]>({
    queryKey: ['year-summary', selectedSport, selectedYear],
    queryFn: fetchYearSummary,
  });
  const formatSecondsToHMS = (time: number): string => {
    // Convert the minutes to seconds

    // Calculate the hours, minutes, and seconds
    const hours = Math.floor(time / 3600);
    const remainingSeconds = time % 3600;
    const mins = Math.floor(remainingSeconds / 60);
    const secs = Math.floor(remainingSeconds % 60);

    // Format the result as hh:mm:ss
    return [
      hours.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  if (isSuccess) {
    console.log(data[0]);
  }

  // console.log(data[0]);
  return (
    <>
      <div className="flex w-full flex-row justify-between pt-4">
        <span className="font-bold text-pb-green">Year&apos;s summary</span>
        <Dropdown
          label={selectedYear}
          outline={true}
          pill={true}
          color={'success'}
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
        {/*Total Time*/}
        {isSuccess && (
          <>
            {/*TODO Add more elements*/}
            <YearSummaryElement
              icon={<ClockIcon className="h-10 w-10 text-white" />}
              label={'Total time'}
              value={formatSecondsToHMS(data[0]?.total_moving_time ?? 0)}
            />
            <YearSummaryElement
              icon={<MapIcon className="h-10 w-10 text-white" />}
              label={'Activities'}
              value={data[0]?.activity_count?.toString() ?? '0'}
            />
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
