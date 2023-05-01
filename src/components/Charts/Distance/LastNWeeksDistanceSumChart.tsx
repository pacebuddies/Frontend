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

  const { data, isError, error } = useQuery<ILastNWeeksDistanceSum[]>({
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
        data: sortedData.map((item) => item.total_distance),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Mean Distance',
        data: Array(sortedData.length || 0).fill(meanValue),
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
        display: true,
        text: 'Distance summary for last weeks',
      },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index' as const,
        filter: (tooltipItem: TooltipItem<'bar'>) => {
          return tooltipItem.raw !== 0;
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  if (isError) {
    toast.error((error as Error).toString());
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="flex w-full  flex-col md:flex-row">
        <div className="order-2 h-128 w-full md:order-1">
          <Bar
            options={barChartOptions}
            // @ts-expect-error - chart.js types are not compatible with react-chartjs-2
            data={barChartData}
            className="overflow-hidden"
          />
        </div>
        <div className="order-1 mb-4 flex flex-col  items-center px-8 md:order-2">
          <span className="mr-2 w-auto whitespace-nowrap">
            Number of weeks:
          </span>
          <Dropdown
            label={weeksNumber}
            outline={true}
            pill={true}
            color={'success'}
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
    </>
  );
};

export default LastNWeeksDistanceSumChart;
