import { useQuery } from '@tanstack/react-query';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { sortByDateAscending } from '../../../Helpers/sortDataByDate';
import { MonthsNames } from '../../../internalTypes/interfaces';
import { ILastNMonthsDistanceSum } from '../../../internalTypes/Interfaces/Distance/distanceInterfaces';
import { useSettingsStore } from '../../../store/settingsStore';
import { unitChange } from '../../../utils/unitChange';

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

  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );
  const toUnit = measurementPreference === 'metric' ? 'km' : 'mile';
  const fetchWeekSummary = (): Promise<ILastNMonthsDistanceSum[]> => {
    return pacebuddiesApi
      .get('bridge/chart/LastNMonthsDistanceSum', {
        params: { sport_type: selectedSport, months_number: monthsNumber },
      })
      .then((response) => response.data);
  };

  const { data, isError, error, isLoading, isFetching } = useQuery<
    ILastNMonthsDistanceSum[]
  >({
    queryKey: ['LastNMonthsDistanceSum', selectedSport, monthsNumber],
    queryFn: fetchWeekSummary,
    keepPreviousData: true,
  });

  const meanValue = Math.round(
    data?.length
      ? data.reduce((acc, item) => acc + item.distance, 0) / data.length
      : 0,
  );
  const sortedData = sortByDateAscending(data ?? []);
  const getMonthAndYearString = (date: string): string => {
    const [, month, year] = date.split('-').map(Number);
    const monthName = MonthsNames[month!];
    return `${monthName} ${year}`;
  };

  const barChartData = {
    labels: sortedData.map((item) => {
      return getMonthAndYearString(item.month_start);
    }),
    datasets: [
      {
        label: 'Distance',
        data: sortedData.map((item) => unitChange(item.distance, 'm', toUnit)),
        backgroundColor: 'rgba(239, 138, 23, 0.2)',
        borderColor: 'rgb(239, 138, 23)',
        borderWidth: 1,
      },
      {
        label: 'Mean Distance',
        data: Array(sortedData.length).fill(unitChange(meanValue, 'm', toUnit)),
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
        text: 'Distance summary for last months',
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
    <>
      <div className="flex w-full flex-col md:flex-row">
        <div className="order-2 h-128 w-full md:order-1">
          <Bar
            options={barChartOptions}
            // @ts-expect-error - chart.js types are not compatible with react-chartjs-2
            data={barChartData}
            className="overflow-hidden"
          />
        </div>
        <div className="order-1 mb-4 flex flex-col  items-center px-8 md:order-2">
          <span className="mr-2 w-auto whitespace-nowrap">
            Number of months:
          </span>
          <Dropdown
            label={monthsNumber}
            outline={true}
            pill={true}
            color={'success'}
            disabled={isLoading || isFetching}
          >
            <Dropdown.Item onClick={() => setMonthsNumber(3)}>3</Dropdown.Item>
            <Dropdown.Item onClick={() => setMonthsNumber(6)}>6</Dropdown.Item>
            <Dropdown.Item onClick={() => setMonthsNumber(12)}>
              12
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default LastNMonthsDistanceSumChart;
