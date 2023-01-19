import { Bar } from 'react-chartjs-2';
import { IAthlete } from '../interfaces';
import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface IProps {
  athlete: IAthlete;
}
const SummaryBarChart = ({ athlete }: IProps) => {
  console.log(athlete);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  console.log(labels.map(() => faker.datatype.number({ min: 0, max: 1000 })))
  const barChartData = {
    labels: ['All'],
    datasets: [
      // {
      //   label: 'swimming',
      //   data: [athlete.activity_stats.totals.find(
      //     (e) => e.total_type == 'SWIM' && e.total_time_range == 'ALL',
      //   )?.distance],
      //   backgroundColor: 'rgb(255, 99, 132)',
      // },
      {
        label: 'riding',
        data: [athlete.activity_stats.totals.find(
          (e) => e.total_type == 'RIDE' && e.total_time_range == 'ALL',
        )?.distance],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'running',
        data: [athlete.activity_stats.totals.find(
          (e) => e.total_type == 'RUN' && e.total_time_range == 'ALL',
        )?.distance],
        backgroundColor: 'rgb(53, 162, 235)',
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
        text: 'Chart.js Bar Chart',
      },
    },
    // responsive: true,
    // interaction: {
    //   mode: 'index' as const,
    //   intersect: false,
    // },
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
export default SummaryBarChart;
