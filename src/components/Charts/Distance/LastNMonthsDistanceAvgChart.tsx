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
import { Dropdown } from 'flowbite-react';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { toast } from 'react-toastify';
import { sortByDateAscending } from '../../../Helpers/sortDataByDate';
import { MonthsNames } from '../../../internalTypes/interfaces';
import { ILastNMonthsDistanceAvg } from '../../../internalTypes/Interfaces/Distance/distanceInterfaces';
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

const LastNMonthsDistanceAvgChart: React.FC<IProps> = ({
  selectedSport,
}: IProps) => {
  const [monthsNumber, setMonthsNumber] = useState<number>(3);

  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );
  const toUnit = measurementPreference === 'metric' ? 'km' : 'mile';

  const fetchData = (): Promise<ILastNMonthsDistanceAvg[]> => {
    return pacebuddiesApi
      .get('bridge/chart/LastNMonthsDistanceAvg', {
        params: { sport_type: selectedSport, months_number: monthsNumber },
      })
      .then((response) => response.data);
  };

  const { data, isError, error, isLoading, isFetching } = useQuery<
    ILastNMonthsDistanceAvg[]
  >({
    queryKey: ['LastNMonthsDistanceAvg', selectedSport, monthsNumber],
    queryFn: fetchData,
    keepPreviousData: true,
  });

  const sortedData = sortByDateAscending(data ?? []);

  const getMonthAndYearString = (date: string): string => {
    const [, month, year] = date.split('-').map(Number);
    const monthName = MonthsNames[month!];
    return `${monthName} ${year}`;
  };

  const chartData: ChartData<'bar', number[], string> = {
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
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
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

  const handeMonthsNumberChange = (value: number) => {
    setMonthsNumber(value);
  };

  if (isError) {
    toast.error((error as Error).toString());
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex w-full  flex-col md:flex-row">
      <div className="order-2 h-128 w-full md:order-1">
        <Bar
          data={chartData}
          options={chartOptions}
          className="overflow-hidden"
        />
      </div>
      <div className="order-1 mb-4 flex flex-col  items-center px-8 md:order-2">
        <span className="mr-2 w-auto whitespace-nowrap">Number of months:</span>
        <Dropdown
          label={monthsNumber}
          outline={true}
          pill={true}
          color={'success'}
          disabled={isLoading || isFetching}
        >
          <Dropdown.Item onClick={() => handeMonthsNumberChange(3)}>
            3
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handeMonthsNumberChange(6)}>
            6
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handeMonthsNumberChange(12)}>
            12
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default LastNMonthsDistanceAvgChart;
