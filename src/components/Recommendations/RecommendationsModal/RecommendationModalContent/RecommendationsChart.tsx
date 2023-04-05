import {
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface IProps {
  data: number[];
}

const RecommendationsChart = ({ data }: IProps) => {
  const options: ChartOptions<'radar'> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          callback: (tickValue: string | number) => {
            return tickValue + '%';
          },
          font: {
            family: 'Arial',
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Arial',
            size: 20,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return context.dataset.label + ': ' + context.parsed.r + '%';
          },
        },
        titleFont: {
          family: 'Arial',
          size: 10,
        },
        bodyFont: {
          family: 'Arial',
          size: 20,
        },
      },
    },
  };

  const dataChart = {
    labels: ['Prędkość', 'Dystans', 'Dni Tygodnia', 'Tempo', 'Sporty'],
    datasets: [
      {
        label: '% Statystyk',
        data: data,
        backgroundColor: 'rgba(81,245,13,0.44)',
        borderColor: 'rgb(45,107,12)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full p-4 font-bold">
      <Radar data={dataChart} options={options} />
    </div>
  );
};

export default RecommendationsChart;
