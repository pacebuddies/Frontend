import { useQuery } from '@tanstack/react-query';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { sortByDateDescending } from '../../../Helpers/sortDataByDate';
import { ILastNWeeksDistanceSum } from '../../../internalTypes/Interfaces/Distance/distanceInterfaces';
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

const LastNWeeksDistanceSumChart = ({ selectedSport }: IProps) => {
  const [weeksNumber, setWeeksNumber] = useState<number>(4);

  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );
  const toUnit = measurementPreference === 'metric' ? 'km' : 'mile';
  const handleWeeksNumberChange = (value: number) => {
    setWeeksNumber(value);
  };
  const fetchWeekSummary = (): Promise<ILastNWeeksDistanceSum[]> => {
    return pacebuddiesApi
      .get('bridge/chart/LastNWeeksDistanceSum', {
        params: { sport_type: selectedSport, weeks_number: weeksNumber },
      })
      .then((response) => response.data);
  };

  const { data, isError, error, isLoading, isFetching } = useQuery<
    ILastNWeeksDistanceSum[]
  >({
    queryKey: ['LastNWeeksDistanceSum', selectedSport, weeksNumber],
    queryFn: fetchWeekSummary,
    keepPreviousData: true,
  });

  const meanValue = Math.round(
    data?.length
      ? data.reduce((acc, item) => acc + item.total_distance, 0) / data.length
      : 0,
  );

  const sortedData = sortByDateDescending(data ?? []);

  const barChartData = {
    labels: sortedData.map((item) => `Week ${item.week_start_date}`),
    datasets: [
      {
        label: 'Distance',
        data: sortedData.map((item) =>
          unitChange(item.total_distance, 'm', toUnit),
        ),
        backgroundColor: 'rgba(239, 138, 23, 0.2)',
        borderColor: 'rgb(239, 138, 23)',
        borderWidth: 1,
      },
      {
        label: 'Mean Distance',
        data: Array(sortedData.length || 0).fill(
          unitChange(meanValue, 'm', toUnit),
        ),
        type: 'line',
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const barChartOptions = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Distance summary for last weeks',
      },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index' as const,
        filter: (tooltipItem: TooltipItem<'bar'>) => {
          return tooltipItem.raw !== 0;
        },
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const label = context.dataset.label ?? '';
            const value = context.parsed.y.toFixed(2);
            return `${label}: ${value} ${toUnit}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Week',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Distance (${toUnit})`,

        },
        ticks: {
          padding: 0,
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
        <div className="flex w-full flex-col  md:pl-10">
          <div className="flex w-2/3 md:w-1/2 border-t-2 border-t-pb-green mb-1 "/>
          <span className="flex text-xl text-pb-green">
            Distance summary for last weeks
          </span>
          <span className="flex text-pb-dark-gray">
            Total distance traveled weekly for selected number of last weeks
          </span>
        </div>
        {/*Wybór zakresu*/}
        <div className=" mb-4 flex flex-row items-center justify-center space-x-2  md:pr-10">
          <div className="flex w-auto text-pb-dark-gray flex-col whitespace-nowrap">
            <span className="flex flex-row ">Number of</span>
            <span className="flex flex-row">weeks:</span>
          </div>
          <Dropdown
              label={weeksNumber}
              outline={true}
              pill={true}
              color={'success'}
              disabled={isLoading || isFetching}
              className="flex shrink-0"
          >
            <Dropdown.Item onClick={() => handleWeeksNumberChange(4)}>
              4
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleWeeksNumberChange(8)}>
              8
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleWeeksNumberChange(16)}>
              16
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      {/*Wykres*/}
      <div className="h-128 w-full px-2">
        <Bar
            options={barChartOptions}
            // @ts-expect-error - chart.js types are not compatible with react-chartjs-2
            data={barChartData}
            className="overflow-hidden"
        />
      </div>
    </div>
  );
};

export default LastNWeeksDistanceSumChart;
