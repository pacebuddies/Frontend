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
import { IActivityWeekSummaryResult } from "../../interfaces";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const WeekSummaryChart = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [weekSummary, setWeekSummary] =
    useState<IActivityWeekSummaryResult | null>(null);

  function fetchActivityDaySummaryHandler() {
    setIsLoaded(false);
    stravaApi
      .get('chart/weekSummary')
      .then((res) => {
        //console.log(res.data)
        if (res.status == 200) {
          setWeekSummary(res.data);
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

  useEffect(() => {
    weekSummary?.result.map((item) => console.log(item.week + " | " + item.week_start_date + " | " + item.average_distance))
  }, [weekSummary]);

  const barChartData = {
    labels: [''],
    datasets: weekSummary?.result.map((item, index) => {
        return {
          label: `Week ${item.week_start_date}`,
          data: [item.average_distance],
      };
      }) ?? [],
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
export default WeekSummaryChart;
