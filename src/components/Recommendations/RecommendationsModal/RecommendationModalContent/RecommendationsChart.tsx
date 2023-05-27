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
import { UserGraphData } from '../../../../internalTypes/recommendationData';
import { useSettingsStore } from '../../../../store/settingsStore';
import { unitChange } from '../../../../utils/unitChange';
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
  user_graph_data: UserGraphData;
  recommended_user_graph_data: UserGraphData;
  recommended_user_name: string;
}

const RecommendationsChart = ({
  user_graph_data,
  recommended_user_graph_data,
  recommended_user_name,
}: IProps) => {
  const measurementPreference = useSettingsStore(
    (state) => state.measurementUnits,
  );

  // const toUnit = measurementPreference === 'imperial' ? 'mile' : 'km';

  const userGraphData: UserGraphData = {
    avg_distance: unitChange(
      user_graph_data.avg_distance,
      'm',
      measurementPreference === 'imperial' ? 'mile' : 'km',
    ),
    avg_elevation_gain: unitChange(
      user_graph_data.avg_elevation_gain,
      'm',
      measurementPreference === 'imperial' ? 'feet' : 'm',
    ),
    avg_moving_time: user_graph_data.avg_moving_time / (60 * 60),
    avg_speed: unitChange(
      user_graph_data.avg_speed,
      'm/s',
      measurementPreference === 'imperial' ? 'mile/h' : 'km/h',
    ),
    number_of_activities_by_sport_type:
      user_graph_data.number_of_activities_by_sport_type,
  };
  const recommendedUserGraphData: UserGraphData = {
    avg_distance: unitChange(
      recommended_user_graph_data.avg_distance,
      'm',
      measurementPreference === 'imperial' ? 'mile' : 'km',
    ),
    avg_elevation_gain: unitChange(
      recommended_user_graph_data.avg_elevation_gain,
      'm',
      measurementPreference === 'imperial' ? 'feet' : 'm',
    ),
    avg_moving_time: recommended_user_graph_data.avg_moving_time / (60 * 60),
    avg_speed: unitChange(
      recommended_user_graph_data.avg_speed,
      'm/s',
      measurementPreference === 'imperial' ? 'mile/h' : 'km/h',
    ),
    number_of_activities_by_sport_type:
      recommended_user_graph_data.number_of_activities_by_sport_type,
  };

  const options: ChartOptions<'radar'> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      r: {
        suggestedMin: 70,
        suggestedMax: 100,
        ticks: {
          callback: (tickValue: string | number) => {
            return tickValue + '%';
          },
          precision: 0,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return context.dataset.label + ': ' + context.parsed.r + '%';
          },
        },
      },
    },
  };

  const labels: (keyof UserGraphData)[] = [
    'avg_speed',
    'avg_elevation_gain',
    'avg_distance',
    'avg_moving_time',
    'number_of_activities_by_sport_type',
  ];

  const maxValues: Partial<UserGraphData> = {
    avg_speed: Math.max(
      userGraphData.avg_speed,
      recommendedUserGraphData.avg_speed,
    ),
    avg_elevation_gain: Math.max(
      userGraphData.avg_elevation_gain,
      recommendedUserGraphData.avg_elevation_gain,
    ),
    avg_distance: Math.max(
      userGraphData.avg_distance,
      recommendedUserGraphData.avg_distance,
    ),
    avg_moving_time: Math.max(
      userGraphData.avg_moving_time,
      recommendedUserGraphData.avg_moving_time,
    ),
    number_of_activities_by_sport_type: Math.max(
      userGraphData.number_of_activities_by_sport_type,
      recommendedUserGraphData.number_of_activities_by_sport_type,
    ),
  };

  const userData = labels.map((label) =>
    Number(((userGraphData[label] / (maxValues[label] ?? 1)) * 100).toFixed(2)),
  );
  const recommendedUserData = labels.map((label) =>
    Number(
      (
        (recommendedUserGraphData[label] / (maxValues[label] ?? 1)) *
        100
      ).toFixed(2),
    ),
  );
  console.log(userData, recommendedUserData);
  const dataChart = {
    labels: [
      'Avg speed',
      'Avg elevation gain',
      'Avg distance',
      'Avg moving time',
      'Number of activities',
    ],
    datasets: [
      {
        label: 'Your stats',
        data: userData,
        backgroundColor: 'rgba(81,245,13,0.44)',
        borderColor: 'rgb(45,107,12)',
        borderWidth: 1,
      },
      {
        label: `${recommended_user_name}'s stats`,
        data: recommendedUserData,
        backgroundColor: 'rgba(239, 138, 23,0.44)',
        borderColor: 'rgb(239, 138, 23)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="absolute left-0 top-0 h-full w-full p-4 font-bold drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
      <Radar data={dataChart} options={options} />
    </div>
  );
};

export default RecommendationsChart;
