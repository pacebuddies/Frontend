import { useQuery } from '@tanstack/react-query';
import MatchList from '../../components/Matches/MatchList';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';
import Layout from '../../Layout';
import { isAllowedSportTypeNumber } from "../../utils/isAllowedSportType";

const Matches = () => {
  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };
  const { data, isSuccess } = useQuery({
    queryKey: ['sports-matches'],
    queryFn: fetchSports,
  });

  const sportsEnum = data?.map((sport) => {
    return SportTypeMap.getNumber(sport)!;
  });
  const fileredSportsEnum = sportsEnum?.filter(isAllowedSportTypeNumber);


  return (
    <Layout>
      <div>
        <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
          <span className="small-caps self-center whitespace-nowrap bg-gradient-to-r from-pb-green to-pb-orange bg-clip-text font-istok-web text-7xl font-bold capitalize text-transparent ">
            Matches
          </span>
        </div>
        <div className="flex h-full min-h-screen w-full justify-center border-t-2 border-t-pb-green bg-pb-gray">
          <div className="flex w-full flex-col items-center bg-white md:w-2/3">
            {isSuccess &&
              fileredSportsEnum?.map((sport) => {
                return (
                  <MatchList
                    key={sport}
                    sportType={sport}
                    className="w-full pt-2"
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Matches;
