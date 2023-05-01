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
import { Line } from 'react-chartjs-2';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { toast } from 'react-toastify';
import { ILastNActivitiesPaceAvg } from '../../../internalTypes/Interfaces/Pace/paceInterfaces';
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

  const fetchData = (): Promise<ILastNActivitiesPaceAvg[]> => {
    return pacebuddiesApi
      .get('bridge/chart/LastNActivitiesPaceAvg', {
        params: { sport_type: selectedSport, num_activities: numActivities },
      })
      .then((response) => response.data);
  };

  const { data, isError, error } = useQuery<ILastNActivitiesPaceAvg[]>({
    queryKey: ['LastNActivitiesPaceAvg', numActivities, selectedSport],
    queryFn: fetchData,
    keepPreviousData: true,
  });

  const chartData: ChartData<'line', number[], string> = {
    labels: data?.map((item) => '') ?? [],
    datasets: [
      {
        label: 'Average Pace per KM',
        data: data?.map((item) => item.avg_pace_per_km) ?? [],
        fill: false,
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    plugins: {
      title: {
        display: true,
        text: 'Average pace for last activities',
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
          <Line
            data={chartData}
            options={chartOptions}
            className="overflow-hidden"
          />
        </div>
        <div className="order-1 mb-4 flex flex-col  items-center px-8 md:order-2">
          <span className="mr-2 w-auto whitespace-nowrap">
            Number of activities:
          </span>
          <Dropdown
            label={numActivities}
            outline={true}
            pill={true}
            color={'success'}
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
    </div>
  );
};

export default ILastNActivitiesPaceAvgChart;
