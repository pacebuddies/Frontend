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
import { toast } from 'react-toastify';
import SummaryBarChart from '../components/Charts/SummaryBarChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

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
        setAthlete(res.data);
        console.log(athlete?.firstname);
        setIsLoaded(true);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err.response);
      });
  }

  useEffect(() => {
    fetchAthleteHandler();
  }, []);

  return (
    <>
      <div className="flex h-screen shrink-0 flex-col flex-nowrap items-center justify-center">
        Home page
        <Button
          outline={true}
          gradientDuoTone="greenToBlue"
          onClick={() => signOut()}
        >
          LogOut
        </Button>
        <Button
          outline={true}
          gradientDuoTone="greenToBlue"
          onClick={() => {
            SynchronizeData();
          }}
        >
          Synchronize Data with strava
        </Button>
        <div>
          {isLoaded && <SummaryBarChart athlete={athlete!.activity_stats} />}
        </div>
      </div>
    </>
  );
};

export default Home;
