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
  TooltipItem,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { toast } from 'react-toastify';
import { useSettingsStore } from '../../../store/settingsStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface IAvtivitiesBySportType {
  sportName: string;
  activitiesCount: number;
}

interface IProps {
  athleteId: number;
}

const LastNMonthsDistanceAvgChart: React.FC<IProps> = ({
  athleteId,
}: IProps) => {
  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );
  const toUnit = measurementPreference === 'metric' ? 'km' : 'mile';

  const fetchData = (): Promise<IAvtivitiesBySportType[]> => {
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

  if (!isSuccess) return <div>Loading...</div>;

  const chartData: ChartData<'bar', number[], string> = {
    labels: data.map((item) => {
      return capitalizeFirstLetter(item.sportName);
    }),
    datasets: [
      {
        label: 'Sport',
        data: data.map((item) => item.activitiesCount),
        backgroundColor: 'rgba(239, 138, 23, 0.2)',
        borderColor: 'rgb(239, 138, 23)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
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
        filter: (tooltipItem: TooltipItem<'bar'>) => {
          return tooltipItem.raw !== 0;
        },
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const label = context.dataset.label ?? '';
            const value = context.parsed.y.toFixed(2);
            return `${label}: ${value} ${toUnit}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Distance (${toUnit})`,
        },
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
            Average distance for last months
          </span>
          <span className="flex text-pb-dark-gray">
            Average traveled distance for monthly activities for selected number
            of last months
          </span>
        </div>
      </div>
      {/*Wykres*/}
      <div className="h-128 w-full px-2">
        <Bar
          data={chartData}
          options={chartOptions}
          className="overflow-hidden"
        />
      </div>
    </div>
  );
};

export default LastNMonthsDistanceAvgChart;
