import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import stravaApi from '../../instances/axiosConfigured';
import { IWeekByDayDistanceSumResult } from '../../interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const WeekByDayDistanceChart = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [distanceSum, setDistanceSum] = useState<IWeekByDayDistanceSumResult | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const chartRef = React.useRef<HTMLCanvasElement>(null);

  function fetchDistanceSum() {
    setIsLoaded(false);
    stravaApi
      .get('chart/daySummary')
      .then((res) => {
        if (res.status === 200) {
          setDistanceSum(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        toast.error(err.toString());
        console.error(err);
      });
  }

  useEffect(() => {
    fetchDistanceSum();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: `Week of ${distanceSum?.result[currentWeek]?.weeks}`,
            data: [
              distanceSum?.result[currentWeek]?.monday || 0,
              distanceSum?.result[currentWeek]?.tuesday || 0,
              distanceSum?.result[currentWeek]?.wednesday || 0,
              distanceSum?.result[currentWeek]?.thursday || 0,
              distanceSum?.result[currentWeek]?.friday || 0,
              distanceSum?.result[currentWeek]?.saturday || 0,
              distanceSum?.result[currentWeek]?.sunday || 0,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };

      new ChartJS(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: {
        },
      });
    }
  }, [chartRef, distanceSum, currentWeek]);

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (distanceSum?.result && currentWeek < distanceSum?.result.length - 1) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  return (
    <div>
      <canvas ref={chartRef}></canvas>
      <button onClick={handlePrevWeek}>Prev week</button>
  <button onClick={handleNextWeek}>Next week</button>
  </div>
);
};

export default WeekByDayDistanceChart;
