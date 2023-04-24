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
import { ILastNMonthsDistanceSum } from '../../internalTypes/interfaces';

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

const LastNMonthsDistanceSumChart = ({ selectedSport }: IProps) => {
  const [monthsNumber, setMonthsNumber] = useState<number>(4);

  const handleWeeksNumberChange = (value: number) => {
    setMonthsNumber(value);
  };
  const fetchWeekSummary = (): Promise<ILastNMonthsDistanceSum[]> => {
    return pacebuddiesApi
      .get('bridge/chart/LastNMonthsDistanceSum', {
        params: { sport_type: selectedSport, months_number: monthsNumber },
      })
      .then((response) => response.data);
  };

  const { data, isLoading, isError, error } = useQuery<
    ILastNMonthsDistanceSum[]
  >({
    queryKey: ['LastNMonthsDistanceSum', selectedSport, monthsNumber],
    queryFn: fetchWeekSummary,
  });

  const meanValue = Math.round(
    data?.length
      ? data.reduce((acc, item) => acc + item.distance, 0) / data.length
      : 0,
  );

  const barChartData = {
    labels: data?.map((item) => `${item.month_name}`) ?? [],
    datasets: [
      {
        label: 'Dystans',
        data: data?.map((item) => item.distance) ?? [],
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
          Number of months:
        </label>
        <Dropdown
          label={monthsNumber}
          outline={true}
          pill={true}
          color={'success'}
        >
          <Dropdown.Item onClick={() => handleWeeksNumberChange(3)}>
            3
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleWeeksNumberChange(6)}>
            6
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
        height={200}
        width={200}
      />
    </>
  );
};

export default LastNMonthsDistanceSumChart;
