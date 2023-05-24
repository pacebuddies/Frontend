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
import pacebuddiesApi from '../../../instances/axiosConfigured';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
interface IProps {
  athleteId?: string;
}

interface IActivitiesNumberIn4Weeks {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

const WeekByDayDistanceChart = ({ athleteId }: IProps) => {
  const fetchDistanceSum = (): Promise<IActivitiesNumberIn4Weeks> => {
    if (athleteId) {
      return pacebuddiesApi
        .get('bridge/chart/WeekdayActivitiesSum', {
          params: { athlete_id: athleteId, weeks: 4 },
        })
        .then((response) => response.data);
    }
    return pacebuddiesApi
      .get('bridge/chart/WeekdayActivitiesSum', {
        params: {
          weeks: 4,
        },
      })
      .then((response) => response.data);
  };

  const { data, isError, error, isSuccess } =
    useQuery<IActivitiesNumberIn4Weeks>({
      queryKey: ['WeekdayActivitiesSum', athleteId],
      queryFn: fetchDistanceSum,
      keepPreviousData: true,
    });

  if (isError) {
    toast.error((error as Error).message);
    return <div>{(error as Error).message}</div>;
  }

  if (!isSuccess) return <div>Loading...</div>;
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
        label: `Number of activities`,
        data: [
          data.monday,
          data.tuesday,
          data.wednesday,
          data.thursday,
          data.friday,
          data.saturday,
          data.sunday,
        ],
        type: 'bar',
        backgroundColor: 'rgba(239, 138, 23, 0.2)',
        borderColor: 'rgb(239, 138, 23)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: false,
        text: 'Daily activity number',
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
        title: {
          display: true,
          text: `Number of activities`,
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
      </div>
      {/*Wykres*/}
      <div className=" w-full px-2">
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
