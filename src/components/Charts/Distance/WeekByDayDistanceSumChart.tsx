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
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../../instances/axiosConfigured';

import { Dropdown } from 'flowbite-react';
import { sortByDateDescending } from '../../../Helpers/sortDataByDate';
import { IWeekByDayDistanceSum } from '../../../internalTypes/Interfaces/Distance/distanceInterfaces';
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
const WeekByDayDistanceChart = ({ selectedSport }: IProps) => {
  const [weekNumber, setWeekNumber] = useState<number>(0);

  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );
  const toUnit = measurementPreference === 'metric' ? 'km' : 'mile';

  const fetchDistanceSum = (): Promise<IWeekByDayDistanceSum[]> => {
    return pacebuddiesApi
      .get('bridge/chart/WeekByDayDistanceSum', {
        params: { sport_type: selectedSport },
      })
      .then((response) => response.data);
  };

  const { data, isError, error, isFetching } = useQuery<
    IWeekByDayDistanceSum[]
  >({
    queryKey: ['WeekByDayDistanceSum', selectedSport],
    queryFn: fetchDistanceSum,
    keepPreviousData: true,
  });

  if (isError) {
    toast.error((error as Error).message);
    return <div>{(error as Error).message}</div>;
  }
  const sortedData = sortByDateDescending(data ?? []);
  const getDataForWeek = (weekData: any): number[] => {
    if (!weekData) {
      return daysOfWeek.map(() => 0);
    }
    const dd = daysOfWeek.map((day) =>
      unitChange(weekData?.[day] ?? 0, 'm', toUnit),
    );
    return dd;
  };
  const getMaxValue = () => {
    const values = sortedData.flatMap((x) => getDataForWeek(x));
    return Math.max(...values).toFixed(2);
  };

  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  // Calculate meanValue based on non zero days
  const nonZeroDays = sortedData[weekNumber]
    ? daysOfWeek.filter(
        (day) =>
          sortedData[weekNumber]![day as keyof IWeekByDayDistanceSum] !== 0,
      )
    : [];

  const meanValue = nonZeroDays.length
    ? nonZeroDays.reduce(
        (acc, day) =>
          acc +
          Number(
            sortedData[weekNumber]![day as keyof IWeekByDayDistanceSum] || 0,
          ),
        0,
      ) / nonZeroDays.length
    : 0;

  const chartData = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: `Week of ${sortedData[weekNumber]?.weeks}`,
        data: getDataForWeek(sortedData[weekNumber]),
        type: 'bar',
        backgroundColor: 'rgba(239, 138, 23, 0.2)',
        borderColor: 'rgb(239, 138, 23)',
        borderWidth: 1,
      },
      {
        label: 'Mean Distance',
        data: Array(7).fill(unitChange(meanValue, 'm', toUnit)),
        type: 'line',
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: false,
        text: 'Daily distance summary',
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar' | 'line'>) {
            const value = context.parsed.y.toFixed(2);
            const label = context.dataset.label ?? '';
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
          text: 'Weekday',
        },
      },
      y: {
        beginAtZero: true,
        max: getMaxValue(),
        title: {
          display: true,
          text: `Distance (${toUnit})`,
        },
        ticks: {
          padding: -75,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex w-full flex-col">
      {/*Opis+wybór zakresu*/}
      <div className="flex w-full flex-row justify-between space-x-1 px-2">
        {/*Opis*/}
        <div className="flex w-full flex-col md:pl-10">
          <div className="mb-1 flex w-2/3 border-t-2 border-t-pb-green md:w-1/2" />
          <span className="flex text-xl text-pb-green">
            Daily distance summary
          </span>
          <span className="flex text-pb-dark-gray">
            Total distance traveled daily in selected week from last 4 weeks
          </span>
        </div>
        {/*Wybór zakresu*/}
        <div className=" mb-4 flex flex-row items-center justify-center space-x-2  md:pr-10">
          <div className="flex w-auto flex-col whitespace-nowrap text-pb-dark-gray">
            <span className="flex flex-row ">Number of</span>
            <span className="flex flex-row">weeks ago:</span>
          </div>
          <Dropdown
            label={weekNumber}
            outline={true}
            pill={true}
            color={'success'}
            disabled={isFetching}
            className="flex shrink-0"
          >
            <Dropdown.Item onClick={() => setWeekNumber(0)}>
              This week
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setWeekNumber(1)}>
              Last week
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setWeekNumber(2)}>
              2 weeks ago
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setWeekNumber(3)}>
              3 weeks ago
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      {/*Wykres*/}
      <div className="h-128 w-full px-2">
        <Bar
          // @ts-expect-error
          data={chartData}
          options={chartOptions}
          className="overflow-hidden"
        />
      </div>
    </div>
  );
};

export default WeekByDayDistanceChart;
