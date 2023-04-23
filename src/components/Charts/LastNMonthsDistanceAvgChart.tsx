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
import { ILastNMonthsDistanceAvg } from "../../internalTypes/interfaces";

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
    // TODO: change path after moving headers to params
    return pacebuddiesApi
      .get(
        'http://devudevu.pacebuddies.club:8080/api/v1/chart/LastNMonthsDistanceAvg',
        {
          params: { sport_type: selectedSport },
          headers: { months_number: monthsNumber },
        },
      )
      .then((response) => response.data);
  };

  const { data, isError, isLoading, isSuccess } = useQuery<
    ILastNMonthsDistanceAvg[]
  >(['LastNMonthsDistanceAvg', selectedSport, monthsNumber], fetchData);

  const chartData: ChartData<'bar', number[], string> = {
    labels: data?.map((item) => item.month_name.trim()) ?? [],
    datasets: [
      {
        label: 'Distance',
        data: data?.map((item) => item.distance) ?? [],
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

  const handeMonthsNumberChange = (value: number) => {
    setMonthsNumber(value);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="monthsNumber" className="mr-2">
          Number of months:
        </label>
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
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {isSuccess && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
};

export default LastNMonthsDistanceAvgChart;
