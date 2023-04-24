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
import pacebuddiesApi from '../../instances/axiosConfigured';
import { ILastNActivitiesPaceAvg } from '../../internalTypes/interfaces';
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

  const { data, isError, isLoading, isSuccess } = useQuery<
    ILastNActivitiesPaceAvg[]
  >(['LastNActivitiesPaceAvg', numActivities, selectedSport], fetchData);

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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleNumActivitiesChange = (value: number) => {
    setNumActivities(value);
  };
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="numActivities" className="mr-2">
          Number of activities:
        </label>
        <Dropdown
          label={numActivities}
          outline={true}
          pill={true}
          color={'success'}
        >
          <Dropdown.Item onClick={() => handleNumActivitiesChange(5)}>
            5
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleNumActivitiesChange(25)}>
            25
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleNumActivitiesChange(50)}>
            50
          </Dropdown.Item>
        </Dropdown>
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {isSuccess && <Line data={chartData} options={chartOptions} />}
    </div>
  );
};

export default ILastNActivitiesPaceAvgChart;
