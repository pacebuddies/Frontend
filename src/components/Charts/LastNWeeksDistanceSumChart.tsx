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
import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { ILastNWeeksDistanceSum } from '../../internalTypes/interfaces';

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

const LastNWeeksDistanceSumChart = ({ selectedSport }: IProps) => {
  const [weeksNumber, setWeeksNumber] = useState<number>(4);

  const handleWeeksNumberChange = (value: number) => {
    setWeeksNumber(value);
  };
  const fetchWeekSummary = (): Promise<ILastNWeeksDistanceSum[]> => {
    return pacebuddiesApi
      .get(
        'bridge/chart/LastNWeeksDistanceSum',
        {
          params: { sport_type: selectedSport, weeks_number: weeksNumber },
        },
      )
      .then((response) => response.data);
  };

  const { data, isLoading, isError, error } = useQuery<
    ILastNWeeksDistanceSum[]
  >({
    queryKey: ['weekSummary', selectedSport, weeksNumber],
    queryFn: fetchWeekSummary,
  });

  const meanValue = Math.round(
    data?.length
      ? data.reduce((acc, item) => acc + item.total_distance, 0) / data.length
      : 0,
  );

  const barChartData = {
    labels: data?.map((item) => `Week ${item.week_start_date}`) ?? [],
    datasets: [
      {
        label: 'Dystans',
        data: data?.map((item) => item.total_distance) ?? [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Mean Value',
        data: Array(data?.length || 0).fill(meanValue),
        type: 'line',
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
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
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index' as const,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error((error as Error).toString());
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="mb-4">
        <label htmlFor="monthsNumber" className="mr-2">
          Number of weeks:
        </label>
        <Dropdown
          label={weeksNumber}
          outline={true}
          pill={true}
          color={'success'}
        >
          <Dropdown.Item onClick={() => handleWeeksNumberChange(3)}>
            4
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleWeeksNumberChange(6)}>
            8
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleWeeksNumberChange(12)}>
            12
          </Dropdown.Item>
        </Dropdown>
      </div>
      <Bar
        options={barChartOptions}
        // @ts-expect-error - chart.js types are not compatible with react-chartjs-2
        data={barChartData}
        height={400}
        width={400}
      />
    </>
  );
};

export default LastNWeeksDistanceSumChart;
