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
import pacebuddiesApi from '../../instances/axiosConfigured';
import { ILastNWeeksPaceAvg } from '../../internalTypes/interfaces';

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

  const { data, isError, isLoading, isSuccess } = useQuery<
    ILastNWeeksPaceAvg[]
  >(['LastNWeeksPaceAvg', selectedSport, weekNumber], fetchData);

  const chartData: ChartData<'bar', number[], string> = {
    labels: data?.map((item) => item.week_start) ?? [],
    datasets: [
      {
        label: 'Distance',
        data: data?.map((item) => item.avg_pace_per_km) ?? [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="mb-4">
        <span className="mr-2">
          Number of weeks:
        </span>
        <Dropdown
          label={weekNumber}
          outline={true}
          pill={true}
          color={'success'}
        >
          <Dropdown.Item onClick={() => setWeekNumber(3)}>3</Dropdown.Item>
          <Dropdown.Item onClick={() => setWeekNumber(6)}>6</Dropdown.Item>
          <Dropdown.Item onClick={() => setWeekNumber(12)}>12</Dropdown.Item>
        </Dropdown>
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {isSuccess && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
};

export default LastNWeeksPaceAvgChart;
