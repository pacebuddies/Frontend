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
import { RecommendationData } from '../RecommendationsModal';
import CompatibilityNumber from "./CompatibilityNumber";
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
  console.log('atleta', athlete === undefined , data.length === 0);
  if (athlete === undefined || data.length === 0) {
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
        {/*Avatar*/}
        <div className="flex flex-row">
          <Image
            src={athlete.profile}
            height={128}
            width={128}
            alt={'user avatar'}
          />
          <div className="ml-8 flex h-full items-center justify-center text-4xl font-bold text-pb-green">
            <span>
              {athlete.firstname} {athlete.lastname}
            </span>
          </div>
        </div>
        {/*Top block information*/}
        <div className="mr-20 flex flex-row">
          <div className="flex h-full flex-col justify-between py-8 pr-4 font-bold text-pb-green">
            <span>Gender</span>
            <span>Location</span>
          </div>
          <div className="flex h-full max-w-sm flex-col justify-between py-8 font-bold text-pb-dark-gray">
            <span>{athlete.sex}</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-pb-dark-gray">
              {athlete.city}, {athlete.country}
            </span>
          </div>
        </div>
      </div>
      {/*Bottom block information*/}
      <div className="flex grow">
        {/*Left block information*/}
        <div className=" flex w-2/5 flex-col justify-between border border-green-500 bg-white p-8">
          <div className="flex w-full flex-col ">
            <span className="font-bold text-pb-green">Activity types</span>
            <div className="flex flex-wrap p-2">
              <span className="p-2">Running</span>
              <span className="p-2">Swimming</span>
              <span className="p-2">Cycling</span>
              <span className="p-2">Running</span>
              <span className="p-2">Swimming</span>
              <span className="p-2">Cycling</span>
              <span className="p-2">Running</span>
              <span className="p-2">Swimming</span>
              <span className="p-2">Cycling</span>
            </div>
          </div>
          <div className="flex min-h-[50%] w-full flex-col">
            <div className="flex w-full flex-row justify-between">
              <span className="font-bold text-pb-green">Clubs</span>
              <span className="ml-4 font-bold text-pb-dark-gray">
                3 mutual clubs
              </span>
            </div>
            <div className="flex flex-col overflow-y-hidden">
              <div className="flex flex-row items-center ">
                <div className="h-12 w-12 rounded-full bg-gradient-to-b from-red-400 to-white"></div>
                <span className="p-2 font-bold text-pb-dark-gray">
                  Torunianie
                </span>
              </div>
              <div className="flex flex-row items-center ">
                <div className="h-12 w-12 rounded-full bg-gradient-to-b from-red-400 to-white"></div>
                <span className="p-2 font-bold text-pb-dark-gray">
                  Bydgoszczanie
                </span>
              </div>
              <div className="flex flex-row items-center ">
                <div className="h-12 w-12 rounded-full bg-gradient-to-b from-red-400 to-white"></div>
                <span className="p-2 font-bold text-pb-dark-gray">
                  Żużlowcy
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*Center block information / compatibility percent */}
        <div
          className="mx-4 flex shrink-0 grow-0 items-center justify-center  bg-white p-8 text-8xl md:pt-52 "
          style={{ width: 'calc(20% - 2rem)' }}
        >
          <div className="font-bold text-pb-dark-gray">
            <CompatibilityNumber num={athlete.compatibility} />
          </div>
        </div>
        {/*Right block information / chart*/}
        <div className="relative w-2/5 border border-green-500 bg-white p-8">
          <div className="absolute top-0 left-0 h-full w-full p-4 font-bold">
            <Radar data={dataChart} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModalContent;
