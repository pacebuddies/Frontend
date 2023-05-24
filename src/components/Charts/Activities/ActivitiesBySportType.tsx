import { useQuery } from '@tanstack/react-query';
import {
  ArcElement,
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
import React from 'react';
import { Pie } from 'react-chartjs-2';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { toast } from 'react-toastify';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

type IAvtivitiesBySportType = Record<string, number>;

interface IProps {
  athleteId?: string;
}

const LastNMonthsDistanceAvgChart: React.FC<IProps> = ({
  athleteId,
}: IProps) => {
  const fetchData = (): Promise<IAvtivitiesBySportType[]> => {
    if (athleteId === undefined) {
      return pacebuddiesApi
        .get('bridge/chart/ActivitiesSumPerSport')
        .then((response) => response.data);
    }
    return pacebuddiesApi
      .get('bridge/chart/ActivitiesSumPerSport', {
        params: { athlete_id: athleteId },
      })
      .then((response) => response.data);
  };

  const { data, isError, error, isSuccess, isFetching } = useQuery<
    IAvtivitiesBySportType[]
  >({
    queryKey: ['ActivitiesBySportType', athleteId],
    queryFn: fetchData,
    keepPreviousData: true,
  });

  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
  };

  const Sports = Object.keys(data ?? []);

  const chartData: ChartData<'pie'> = {
    labels: Sports.map((item) => capitalizeFirstLetter(item)),
    datasets: [
      {
        label: 'Sport',
        // @ts-expect-error
        data: Sports.map((item) => data[item]),
        backgroundColor: Sports.map((item, index) => {
          return index % 2 === 0
            ? 'rgba(239, 138, 23, 0.2)'
            : 'rgba(76, 189, 23, 0.2)';
        }),
        borderColor: Sports.map((item, index) => {
          return index % 2 === 0 ? 'rgba(239, 138, 23)' : 'rgba(76, 189, 23)';
        }),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Average distance for last months',
      },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index' as const,
      },
    },

    maintainAspectRatio: false,
  };

  if (isError) {
    toast.error((error as Error).toString());
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex w-full flex-col">
      {/*Opis+wybór zakresu*/}
      <div className="flex w-full flex-row justify-between space-x-1 px-2">
        {/*Opis*/}
        <div className="flex w-full flex-col md:pl-10">
          <div className="mb-1 flex w-2/3 border-t-2 border-t-pb-green md:w-1/2" />
          <span className="flex text-xl text-pb-green">
            Activities by sport type
          </span>
          <span className="flex text-pb-dark-gray">
            Number of activities by sport type
          </span>
        </div>
      </div>
      {/*Wykres*/}
      <div className="h-128 w-full px-2">
        <Pie
          data={chartData}
          options={chartOptions}
          className="overflow-hidden"
        />
      </div>
    </div>
  );
};

export default LastNMonthsDistanceAvgChart;
