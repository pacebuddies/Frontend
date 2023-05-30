import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import SummaryBarChart from '../components/Charts/SummaryBarChart';
import pacebuddiesApi from '../instances/axiosConfigured';
import { IAthlete } from '../internalTypes/interfaces';
import Layout from '../Layout';
import { useSetAthleteStore } from '../store/athleteStore';
import { useEffect } from 'react';
import {Button} from "flowbite-react";
import Link from "next/link";
import WeekByDayDistanceSumChart from "../components/Charts/Distance/WeekByDayDistanceSumChart";
import ActivitiesNumberIn4Weeks from "../components/Charts/Activities/ActivitiesNumberIn4Weeks";
import { useSetAthleteSportsStore } from "../store/athleteSportsStore";
import { SportTypeMap } from "../internalTypes/SportTypeMap";
import { SportTypeEnum } from "../internalTypes/sportTypeEnum";

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

  const fetchAthleteSportTypesHandler = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };

  const athleteSportTypesQuery = useQuery<string[]>({
    queryKey: ['athlete-sport-types'],
    queryFn: fetchAthleteSportTypesHandler,
  }
  );

  const setSportTypesStore = useSetAthleteSportsStore((state) => state.setAthleteSports);

  const setAthleteStore = useSetAthleteStore((state) => state.setAthlete);
  useEffect(() => {
    setAthleteStore({ athlete: athleteQuery.data ?? null });
    const sportTypes = athleteSportTypesQuery.data ?? [];
    const mapedSportTypes = sportTypes.map((sportType) => {
      return SportTypeMap.getNumber(sportType)!;
    });
    setSportTypesStore(mapedSportTypes);
  }, [athleteQuery.data, athleteSportTypesQuery.data])

  return (
    <>
      <Layout>
        <div className="flex h-full shrink-0 flex-col flex-nowrap items-center">
          <div className="flex h-full min-h-screen w-full justify-center border-t-2 border-t-pb-green bg-pb-gray">
            {/*Central content*/}
            <div className="flex w-full flex-col items-center bg-white md:w-2/3">
              {/*INFO ON GRADIENT*/}
              <div className="flex flex-row w-[calc(100%-2rem)] h-24 my-5 px-5 rounded-3xl bg-gradient-to-r from-pb-green to-pb-dark-green justify-evenly items-center drop-shadow-lg">
                <div className="flex flex-col w-3/4 h-3/4 items-start justify-center">
                  <span className="flex flex-row items-center justify-center small-caps font-bold text-xl md:text-3xl text-white drop-shadow-md">
                    check out settings
                  </span>
                  <span className="flex flex-row items-center justify-center small-caps font-bold text-md md:text-xl text-white drop-shadow-md">
                    set your contact info and preferences
                  </span>
                </div>
                <Link href='/settings' className="flex px-6 items-center justify-center shrink-0 flex-col w-22 h-12 border border-white rounded-full leading-4">
                  <span className="flex flex-row items-center justify-center small-caps font-bold text-white">
                    go to
                  </span>
                  <span className="flex flex-row items-center justify-center small-caps font-bold text-white">
                    settings
                  </span>
                </Link>
              </div>
              {/*Chart:4weeks*/}
              <ActivitiesNumberIn4Weeks />
              {/*Latest activity(only one)*/}

            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
