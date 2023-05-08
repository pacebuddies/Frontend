import { useQuery } from '@tanstack/react-query';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { sortByDateDescending } from '../../../Helpers/sortDataByDate';
import { IWeekByDayDistanceSum } from '../../../internalTypes/Interfaces/Distance/distanceInterfaces';

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
const WeekByDayDistanceChart = ({ selectedSport }: IProps) => {
  const [currentWeek, setCurrentWeek] = useState<number>(0);

  const fetchDistanceSum = (): Promise<IWeekByDayDistanceSum[]> => {
    return pacebuddiesApi
      .get('bridge/chart/WeekByDayDistanceSum', {
        params: { sport_type: selectedSport },
      })
      .then((response) => response.data);
  };

  const { data, isLoading, isError, error } = useQuery<IWeekByDayDistanceSum[]>(
    {
      queryKey: ['WeekByDayDistanceSum', selectedSport],
      queryFn: fetchDistanceSum,
      keepPreviousData: true,
    },
  );
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error((error as Error).message);
    return <div>{(error as Error).message}</div>;
  }
  const sortedData = sortByDateDescending(data ?? []);
  const getMaxValue = () => {
    const values = sortedData.flatMap((week) => [
      week.monday,
      week.tuesday,
      week.wednesday,
      week.thursday,
      week.friday,
      week.saturday,
      week.sunday,
    ]);
    return Math.round(Math.max(...values) / 100) * 100;
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: `Week of ${sortedData[currentWeek]?.weeks}`,
        data: [
          sortedData[currentWeek]?.monday ?? 0,
          sortedData[currentWeek]?.tuesday ?? 0,
          sortedData[currentWeek]?.wednesday ?? 0,
          sortedData[currentWeek]?.thursday ?? 0,
          sortedData[currentWeek]?.friday ?? 0,
          sortedData[currentWeek]?.saturday ?? 0,
          sortedData[currentWeek]?.sunday ?? 0,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Daily distance summary',
      },
    },
    scales: {
      y: {
        min: 0,
        max: getMaxValue(),
        title: {
          display: true,
          text: 'Distance (m)',
        },
      },
    },
    maintainAspectRatio: false,
  };

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < data!.length - 1) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  return (
    <div className="flex w-full flex-row items-center justify-center">
      {currentWeek > 0 && <button onClick={handlePrevWeek}>Prev week</button>}
      <Bar
        data={chartData}
        options={chartOptions}
        width={200}
        height={200}
        className="mx-10"
      ></Bar>
      {currentWeek < data!.length - 1 && (
        <button onClick={handleNextWeek}>Next week</button>
      )}
    </div>
  );
};

export default WeekByDayDistanceChart;
