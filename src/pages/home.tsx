import { Button } from 'flowbite-react';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

import stravaApi from '../instances/axiosConfigured';
import { IAthlete } from '../interfaces';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import SummaryBarChart from '../components/SummaryBarChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 3),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 23),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 1',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => 10),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 2',
    },
  ],
};

const Home: NextPage = () => {
  const [athlete, setAthlete] = useState<IAthlete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  async function SynchronizeData() {
    await stravaApi
      .get('synchronize')
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchAthleteHandler() {
    setIsLoaded(false);
    stravaApi
      .get('athlete')
      .then((res) => {
        // console.log(res);
        setAthlete(res.data);
        console.log(athlete?.firstname);
        setIsLoaded(true);
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  async function getData() {
    // var data= await stravaApi
    //    .get('synchronize')
    //    .then((res) => {
    //      console.log(res);
    //
    //    })
    //    .catch((err) => {
    //      console.log(err);
    //    });

    await stravaApi
      .get('athlete')
      .then((res) => {
        // console.log(res);
        setAthlete(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    // console.log(synch);
    //
    // const data = await stravaApi
    //   .get('athlete')
    //   .then((res) => {
    //     return res;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(data);
  }

  useEffect(() => {
    fetchAthleteHandler();
  }, []);

  return (
    <>
      <div className="flex h-screen shrink-0 flex-col flex-nowrap items-center justify-center">
        Home page
        <Button onClick={() => signOut()}>LogOut</Button>
        <Button
          onClick={() => {
            SynchronizeData();
            console.log(
              athlete?.activity_stats.totals.find(
                (e) => e.total_type == 'RIDE' && e.total_time_range == 'ALL',
              )?.distance,
            );
          }}
        >
          Synchronize Data with strava
        </Button>
        {/*<h1 className={`text-[${color}]`}>Hello World!</h1>*/}
        <div>{isLoaded && <SummaryBarChart athlete={athlete!} />}</div>
      </div>
    </>
  );
};

export default Home;
