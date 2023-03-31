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
import Image from 'next/image';
import { Radar } from 'react-chartjs-2';
import avatarPhoto from '../../../../src/img/avatar-example.jpg';
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
  num: number;
}

const RecommendationsModalContent = ({ data, num }: IProps) => {
  const number = num;
  console.log(number);

  const athlete: RecommendationData | undefined = data[number];

  if (athlete === undefined) {
    return <div>Brak danych</div>;
  }

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
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-8 flex w-4/5 flex-row justify-between border border-green-500 bg-white">
        <div className="flex flex-row">
          <Image
            src={avatarPhoto.src}
            height={128}
            width={128}
            alt={'user avatar'}
          />
          <div className="ml-8 flex h-full items-center justify-center text-pb-green text-4xl">
            <span>
              {athlete.name} {athlete.surname}
            </span>
          </div>
        </div>
        <div className="mr-20 flex flex-row">
          <div className="flex h-full flex-col justify-between py-8 pr-4 text-pb-green">
            <span>Gender</span>
            <span>Location</span>
          </div>
          <div className="flex h-full max-w-sm flex-col justify-between py-8">
            <span>Male</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              Warsaw, Poland
            </span>
          </div>
        </div>
      </div>
      <div className="flex grow">
        <div className="grow border border-green-500 bg-white p-8">Blok 1</div>
        <div
          className="flex items-center justify-center text-8xl md:pt-52 mx-4 shrink-0 grow-0 border border-green-500 bg-white p-8 "
          style={{ width: 'calc(20% - 2rem)' }}
        >
          <span>{athlete.age}%</span>
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
