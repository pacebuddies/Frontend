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
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import stravaApi from '../../instances/axiosConfigured';
import { ILastNWeeksDistanceSum } from '../../internalTypes/interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const fetchWeekSummary = async () => {
  const response = await stravaApi.get(
    'http://devudevu.pacebuddies.club:8080/api/v1/chart/LastNWeeksDistanceSum',
    {
      params: { sport_type: 26, weeks_number: 12 },
    },
  );
  return response.data;
};

const LastNWeeksDistanceSumChart = () => {
  const { data, isLoading, isError, error } = useQuery<
    ILastNWeeksDistanceSum[]
  >({
    queryKey: ['weekSummary'],
    queryFn: fetchWeekSummary,
  });
  // TODO: sort data by week_start_date
  const barChartData = {
    labels: ['Dystans'],
    datasets:
      data?.map((item) => {
        return {
          label: `Week ${item.week_start_date}`,
          data: [item.total_distance],
        };
      }) ?? [],
  };

  const barChartOptions = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Podsumowanie aktywności',
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error((error as Error).toString());
    console.error(error);
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Bar
        options={barChartOptions}
        data={barChartData}
        height={400}
        width={400}
      />
    </>
  );
};

export default LastNWeeksDistanceSumChart;
