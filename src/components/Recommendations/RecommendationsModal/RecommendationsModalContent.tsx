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
import { RecommendationData } from './RecommendationsModal';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const dataChart = {
  labels: ['Prędkość', 'Dystans', 'Dni Tygodnia', 'Tempo', 'Sporty'],
  datasets: [
    {
      label: '% Statystyk',
      data: [60, 90, 40, 50, 70],
      backgroundColor: 'rgba(81,245,13,0.44)',
      borderColor: 'rgb(45,107,12)',
      borderWidth: 1,
    },
  ],
};
interface IProps {
  data: RecommendationData[];
  num?: number;
}
const RecommendationsModalContent = ({ data, num }: IProps) => {
  const number = num ?? 0;
  console.log(number);
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
          }
        }
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
          size: 40,
        },
      },
    },
  };
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-8 w-4/5 border border-green-500 bg-white p-8">
        Blok top {data[number]?.name}
      </div>
      <div className="flex grow">
        <div className="grow border border-green-500 bg-white p-8">Blok 1</div>
        <div
          className="mx-4 shrink-0 grow-0 border border-green-500 bg-white p-8"
          style={{ width: 'calc(20% - 2rem)' }}
        >
          Blok 2
        </div>
        <div className="relative grow border border-green-500 bg-white p-8">
          <div className="absolute top-0 left-0 h-full w-full p-4">
            <Radar data={dataChart} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModalContent;
