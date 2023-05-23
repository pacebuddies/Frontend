import { useQuery } from '@tanstack/react-query';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { Dropdown } from 'flowbite-react';
import React, { useState } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { toast } from 'react-toastify';
import { ILastNActivitiesPaceAvg } from '../../../internalTypes/Interfaces/Pace/paceInterfaces';
import { useSettingsStore } from '../../../store/settingsStore';
import { unitChange } from '../../../utils/unitChange';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
interface IProps {
  selectedSport: number | null;
}
const ILastNActivitiesPaceAvgChart: React.FC<IProps> = ({
  selectedSport,
}: IProps) => {
  const [numActivities, setNumActivities] = useState<number>(50);

  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );
  const toUnit = measurementPreference === 'metric' ? 'min/km' : 'min/mile';
  const fetchData = (): Promise<ILastNActivitiesPaceAvg[]> => {
    return pacebuddiesApi
      .get('bridge/chart/LastNActivitiesPaceAvg', {
        params: { sport_type: selectedSport, num_activities: numActivities },
      })
      .then((response) => response.data);
  };

  const { data, isError, error, isLoading, isFetching } = useQuery<
    ILastNActivitiesPaceAvg[]
  >({
    queryKey: ['LastNActivitiesPaceAvg', numActivities, selectedSport],
    queryFn: fetchData,
    keepPreviousData: true,
  });

  function decimalToMinutesAndSeconds(decimalTime: string | number) {
    const decimal =
      typeof decimalTime === 'string' ? parseFloat(decimalTime) : decimalTime;
    const minutes = Math.floor(decimal);
    const seconds = Math.round((decimal - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const chartData: ChartData<'line', number[], string> = {
    labels: data?.map((item, index) => (index + 1).toString()) ?? [],
    datasets: [
      {
        label: `Average Pace (${toUnit})`,
        data:
          data?.map((item) =>
            unitChange(item.avg_pace_per_km, 'min/km', toUnit),
          ) ?? [],
        fill: true,
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'rgba(239, 138, 23, 0.2)',
        borderColor: 'rgb(239, 138, 23)',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    plugins: {
      title: {
        display: false,
        text: 'Average pace for last activities',
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const label = context.dataset.label ?? '';
            const value = decimalToMinutesAndSeconds(context.parsed.y);
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Activity',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Pace (${toUnit})`,
        },
        ticks: {
          callback: decimalToMinutesAndSeconds,
        },
      },
    },
    maintainAspectRatio: false,
  };

  if (isError) {
    toast.error((error as Error).toString());
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex w-full flex-col">
      {/*Opis+wybór zakresu*/}
      <div className="flex w-full flex-row justify-between px-2 space-x-1">
        {/*Opis*/}
        <div className="flex w-full flex-col md:pl-10">
          <div className="flex w-2/3 md:w-1/2 border-t-2 border-t-pb-green mb-1"/>
          <span className="flex text-xl text-pb-green">
            Average pace for last activities
          </span>
          <span className="flex text-pb-dark-gray">
            Average pace for selected number of last activities
          </span>
        </div>
        {/*Wybór zakresu*/}
        <div className=" mb-4 flex flex-row items-center justify-center space-x-2  md:pr-10">
          <div className="flex w-auto text-pb-dark-gray flex-col whitespace-nowrap">
            <span className="flex flex-row ">Number of</span>
            <span className="flex flex-row">activities:</span>
          </div>
          <Dropdown
              label={numActivities}
              outline={true}
              pill={true}
              color={'success'}
              disabled={isLoading || isFetching}
              className="flex shrink-0"
          >
            <Dropdown.Item onClick={() => setNumActivities(5)}>5</Dropdown.Item>
            <Dropdown.Item onClick={() => setNumActivities(25)}>
              25
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setNumActivities(50)}>
              50
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      {/*Wykres*/}
      <div className="h-128 w-full px-2">
        <Line
            data={chartData}
            options={chartOptions}
            className="overflow-hidden"
        />
      </div>
    </div>
  );
};

export default ILastNActivitiesPaceAvgChart;
