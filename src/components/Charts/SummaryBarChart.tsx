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
import { IAthleteActivityStats } from '../../interfaces';
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
interface IProps {
  athlete: IAthleteActivityStats;
}

const SummaryBarChart = ({ athlete }: IProps) => {
  const [timeRange, setTimeRange] = useState<'ALL' | 'RECENT' | 'YTD'>('ALL');

  const barChartData = {
    labels: [timeRange],
    datasets: [
      {
        label: 'riding',
        data: [
          athlete.totals.find(
            (e) => e.total_type == 'RIDE' && e.total_time_range == timeRange,
          )?.distance,
        ],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'running',
        data: [
          athlete.totals.find(
            (e) => e.total_type == 'RUN' && e.total_time_range == timeRange,
          )?.distance,
        ],
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
        text: 'Podsumowanie aktywności',
      },
    },
  };

  return (
    <>
      <Dropdown
        outline={true}
        placement="right"
        gradientDuoTone="greenToBlue"
        label={timeRange}
      >
        <Dropdown.Item onClick={() => setTimeRange('ALL')}>
          All time
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTimeRange('YTD')}>
          Year to day
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTimeRange('RECENT')}>
          Recent
        </Dropdown.Item>
      </Dropdown>
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
