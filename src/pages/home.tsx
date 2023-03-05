import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryBarChart from '../components/Charts/SummaryBarChart';
import MenuButton from '../components/MenuButton';
import RecommendationsButton from '../components/Recommendations/RecommendationsButton';
import StravaWatermark from '../components/StravaWatermark';
import TopNavBar from '../components/TopNavBar';
import stravaApi from '../instances/axiosConfigured';
import { IAthlete } from '../interfaces';
import RecommendationsModal from "../components/Recommendations/RecommendationsModal";

const Home: NextPage = () => {
  const [athlete, setAthlete] = useState<IAthlete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function fetchAthleteHandler() {
    setIsLoaded(false);
    stravaApi
      .get('athlete')
      .then((res) => {
        if (res.status == 200) {
          setAthlete(res.data);
          console.log(athlete?.firstname);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        toast.error(err);
        console.log(err.response);
      });
  }

  useEffect(() => {
    fetchAthleteHandler();
  }, []);

  return (
    <>
      <div className="flex h-screen shrink-0 flex-col flex-nowrap items-center justify-center">
        <TopNavBar />
        Home page
        <div>
          {isLoaded && <SummaryBarChart athlete={athlete!.activity_stats} />}
        </div>
      </div>
      <RecommendationsModal opened={true} />
      <RecommendationsButton />
      <MenuButton />
      <StravaWatermark />
    </>
  );
};

export default Home;
