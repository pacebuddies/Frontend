import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import SummaryBarChart from '../components/Charts/SummaryBarChart';
import MenuButton from '../components/MenuButton';
import RecommendationsButton from '../components/Recommendations/RecommendationsButton';
import StravaWatermark from '../components/StravaWatermark';
import TopNavBar from '../components/TopNavBar';
import pacebuddiesApi from '../instances/axiosConfigured';
import { IAthlete } from '../internalTypes/interfaces';
import { useSetAthleteStore } from '../store/athleteStore';

const Home: NextPage = () => {
  const fetchAthleteHandler = (): Promise<IAthlete> => {
    return pacebuddiesApi
      .get('bridge/athlete')
      .then((response) => response.data);
  };

  const athleteQuery = useQuery<IAthlete>({
    queryKey: ['athlete'],
    queryFn: fetchAthleteHandler,
  });

  const setAthleteStore = useSetAthleteStore((state) => state.setAthlete);
  if (athleteQuery.isSuccess) {
    setAthleteStore({ athlete: athleteQuery.data });
  }

  return (
    <>
      <TopNavBar />
      <div className="flex h-screen shrink-0 flex-col flex-nowrap items-center">
        Home page
        {/* TODO: poprawienie wyświetlania wykresu na mniejszym screenie */}
        <div>
          {athleteQuery.isSuccess && (
            <SummaryBarChart athlete={athleteQuery.data.activity_stats} />
          )}
          {athleteQuery.isError && (
            // @ts-expect-error
            <div>error : {athleteQuery.error.message}</div>
          )}
        </div>
      </div>
      <RecommendationsButton />
      <MenuButton />
      <StravaWatermark />
    </>
  );
};

export default Home;
