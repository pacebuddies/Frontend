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

  const handeMonthsNumberChange = (value: number) => {
    setMonthsNumber(value);
  };

  if (isError) {
    toast.error((error as Error).toString());
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex w-full flex-col">
      {/*Opis+wybór zakresu*/}
      <div className="flex w-full flex-row justify-between px-2 space-x-1">
        {/*Opis*/}
        <div className="flex w-full flex-col md:pl-10">
          <div className="flex w-2/3 md:w-1/2 border-t-2 border-t-pb-green mb-1"/>
          <span className="flex text-xl text-pb-green">
            Average distance for last months
          </span>
          <span className="flex text-pb-dark-gray">
            Average traveled distance for monthly activities for selected number of last months
          </span>
        </div>
        {/*Wybór zakresu*/}
        <div className=" mb-4 flex flex-row items-center justify-center space-x-2  md:pr-10">
          <div className="flex w-auto text-pb-dark-gray flex-col whitespace-nowrap">
            <span className="flex flex-row ">Number of</span>
            <span className="flex flex-row">months:</span>
          </div>
          <Dropdown
              label={monthsNumber}
              outline={true}
              pill={true}
              color={'success'}
              disabled={isLoading || isFetching}
              className="flex shrink-0"
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
