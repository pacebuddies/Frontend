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
} from 'chart.js';
import { Dropdown } from 'flowbite-react';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { toast } from 'react-toastify';
import { sortByDateDescending } from '../../../Helpers/sortDataByDate';
import { ILastNWeeksPaceAvg } from '../../../internalTypes/Interfaces/Pace/paceInterfaces';

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

const LastNWeeksPaceAvgChart: React.FC<IProps> = ({
  selectedSport,
}: IProps) => {
  const [weekNumber, setWeekNumber] = useState<number>(3);

  const fetchData = (): Promise<ILastNWeeksPaceAvg[]> => {
    return pacebuddiesApi
      .get('bridge/chart/LastNWeeksPaceAvg', {
        params: { sport_type: selectedSport, weeks: weekNumber },
      })
      .then((response) => response.data);
  };

  const { data, isError, error, isLoading, isFetching } = useQuery<
    ILastNWeeksPaceAvg[]
  >({
    queryKey: ['LastNWeeksPaceAvg', selectedSport, weekNumber],
    queryFn: fetchData,
    keepPreviousData: true,
  });

  const sortedData = sortByDateDescending(data ?? []);

  const chartData: ChartData<'bar', number[], string> = {
    labels: sortedData.map((item) => item.week_start),
    datasets: [
      {
        label: 'Distance',
        data: sortedData.map((item) => item.avg_pace_per_km),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: true,
        text: 'Distance summary for last weeks',
      },
    },
    scales: {
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
    <div>
      <div className="flex w-full  flex-col md:flex-row">
        <div className="order-2 h-128 w-full md:order-1">
          <Bar
            data={chartData}
            options={chartOptions}
            className="overflow-hidden"
          />
        </div>
        <div className="order-1 mb-4 flex flex-col  items-center px-8 md:order-2">
          <span className="mr-2 w-auto whitespace-nowrap">
            Number of weeks:
          </span>
          <Dropdown
            label={weekNumber}
            outline={true}
            pill={true}
            color={'success'}
            disabled={isLoading || isFetching}
          >
            <Dropdown.Item onClick={() => setWeekNumber(4)}>4</Dropdown.Item>
            <Dropdown.Item onClick={() => setWeekNumber(8)}>8</Dropdown.Item>
            <Dropdown.Item onClick={() => setWeekNumber(16)}>16</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default LastNWeeksPaceAvgChart;
