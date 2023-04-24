import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import stravaApi from '../../instances/axiosConfigured';
import { IActivityDaySummary } from '../../internalTypes/interfaces';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface IProps {
  selectedSport: SportTypeEnum | null;
}

const DaySummaryChart = ({ selectedSport }: IProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [daySummary, setDaySummary] = useState<IActivityDaySummary[] | null>(
    null,
  );
  const [weekDays, setWeekDays] = useState<
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'
  >('Monday');

  function fetchActivityDaySummaryHandler() {
    setIsLoaded(false);
    stravaApi
      .get('http://devudevu.pacebuddies.club:8080/api/v1/chart/LastNWeeksDistanceSum', {params: { sport_type: 26, weeks_number: 12 }})
      .then((res) => {
        //console.log(res.data)
        if (res.status == 200) {
          setDaySummary(res.data);
          //console.log(daySummary);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        toast.error(err);
        console.log(err.response);
      });
  }

  useEffect(() => {
    fetchActivityDaySummaryHandler();
    //console.log(daySummary);
  }, []);

  const colors = [
    'rgb(75, 192, 192)',
    'rgb(53, 162, 235)',
    'rgb(255, 99, 132)',
    'rgb(255, 205, 86)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
  ];

  const barChartData = {
    labels: [weekDays],
    datasets: [
      {
        label: 'Monday',
        data: [daySummary?.find((e) => e.week_day == 'Monday')?.summary],
        backgroundColor: colors[0],
      },
      {
        label: 'Tuesday',
        data: [daySummary?.find((e) => e.week_day == 'Tuesday')?.summary],
        backgroundColor: colors[1],
      },
      {
        label: 'Wednesday',
        data: [daySummary?.find((e) => e.week_day == 'Wednesday')?.summary],
        backgroundColor: colors[2],
      },
      {
        label: 'Thursday',
        data: [daySummary?.find((e) => e.week_day == 'Thursday')?.summary],
        backgroundColor: colors[3],
      },
      {
        label: 'Friday',
        data: [daySummary?.find((e) => e.week_day == 'Friday')?.summary],
        backgroundColor: colors[4],
      },
      {
        label: 'Saturday',
        data: [daySummary?.find((e) => e.week_day == 'Saturday')?.summary],
        backgroundColor: colors[5],
      },
      {
        label: 'Sunday',
        data: [daySummary?.find((e) => e.week_day == 'Sunday')?.summary],
        backgroundColor: colors[6],
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
    },
  };

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
export default DaySummaryChart;
