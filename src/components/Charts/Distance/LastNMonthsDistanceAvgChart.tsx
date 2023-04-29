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
import { ILastNMonthsDistanceAvg } from '../../../internalTypes/Interfaces/Distance/distanceInterfaces';

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

const LastNMonthsDistanceAvgChart: React.FC<IProps> = ({
  selectedSport,
}: IProps) => {
  const [monthsNumber, setMonthsNumber] = useState<number>(3);

  const fetchData = (): Promise<ILastNMonthsDistanceAvg[]> => {
    return pacebuddiesApi
      .get('bridge/chart/LastNMonthsDistanceAvg', {
        params: { sport_type: selectedSport, months_number: monthsNumber },
      })
      .then((response) => response.data);
  };

  const { data, isError, error } = useQuery<ILastNMonthsDistanceAvg[]>(
    ['LastNMonthsDistanceAvg', selectedSport, monthsNumber],
    fetchData,
  );

  const sortedData = sortByDateDescending(data ?? []);

  const chartData: ChartData<'bar', number[], string> = {
    labels: sortedData.map((item) => item.month_name.trim()),
    datasets: [
      {
        label: 'Distance',
        data: sortedData.map((item) => item.distance),
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
        text: 'Average distance for last months',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  const handeMonthsNumberChange = (value: number) => {
    setMonthsNumber(value);
  };

  if (isError) {
    toast.error((error as Error).toString());
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex w-full  flex-col md:flex-row">
      <div className="order-2 h-128 w-full md:order-1">
        <Bar
          data={chartData}
          options={chartOptions}
          className="overflow-hidden"
        />
      </div>
      <div className="order-1 mb-4 flex flex-col  items-center px-8 md:order-2">
        <span className="mr-2 w-auto whitespace-nowrap">Number of months:</span>
        <Dropdown
          label={monthsNumber}
          outline={true}
          pill={true}
          color={'success'}
        >
          <Dropdown.Item onClick={() => handeMonthsNumberChange(3)}>
            3
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handeMonthsNumberChange(6)}>
            6
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handeMonthsNumberChange(12)}>
            12
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default LastNMonthsDistanceAvgChart;
