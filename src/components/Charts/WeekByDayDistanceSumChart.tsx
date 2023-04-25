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
import pacebuddiesApi from '../../instances/axiosConfigured';
import { IWeekByDayDistanceSum } from '../../internalTypes/interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const fetchDistanceSum = async (): Promise<IWeekByDayDistanceSum[]> => {
  const { data } = await pacebuddiesApi.get(
    'http://devudevu.pacebuddies.club:8080/api/v1/chart/WeekByDayDistanceSum',
    { params: { sport_type: 26 } },
  );
  return data;
};

const WeekByDayDistanceChart = () => {
  const [currentWeek, setCurrentWeek] = useState<number>(0);

  const {
    data: distanceSum,
    isLoading,
    isError,
    error,
  } = useQuery<IWeekByDayDistanceSum[]>({
    queryKey: ['distanceSum'],
    queryFn: fetchDistanceSum,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error((error as Error).message);
    return <div>{(error as Error).message}</div>;
  }

  const getMaxValue = () => {
    const values = distanceSum.flatMap((week) => [
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
        label: `Week of ${distanceSum[currentWeek]?.weeks}`,
        data: [
          distanceSum[currentWeek]?.monday ?? 0,
          distanceSum[currentWeek]?.tuesday ?? 0,
          distanceSum[currentWeek]?.wednesday ?? 0,
          distanceSum[currentWeek]?.thursday ?? 0,
          distanceSum[currentWeek]?.friday ?? 0,
          distanceSum[currentWeek]?.saturday ?? 0,
          distanceSum[currentWeek]?.sunday ?? 0,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        min: 0,
        max: getMaxValue(),
      },
    },
  };

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < distanceSum!.length - 1) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  return (
    <div className="flex flex-row ">
      {currentWeek > 0 && <button onClick={handlePrevWeek}>Prev week</button>}
      <Bar
        data={chartData}
        options={chartOptions}
        width={600}
        height={400}
      ></Bar>
      {currentWeek < distanceSum!.length - 1 && (
        <button onClick={handleNextWeek}>Next week</button>
      )}
    </div>
  );
};

export default WeekByDayDistanceChart;
