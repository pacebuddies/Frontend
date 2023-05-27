import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ActivitiesBySportType from '../../components/Charts/Activities/ActivitiesBySportType';
import ActivitiesNumberIn4Weeks from '../../components/Charts/Activities/ActivitiesNumberIn4Weeks';
import WeekByDayDistanceChart from '../../components/Charts/Distance/WeekByDayDistanceSumChart';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { IActivity, IAthlete } from '../../internalTypes/interfaces';
import { ClubsData } from '../../internalTypes/recommendationData';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';
import Layout from '../../Layout';
import { useSettingsStore } from '../../store/settingsStore';

const ClientOnlyActivities = dynamic(
  () => import('../../../src/components/Activity/ClientOnlyActivities'),
  { ssr: false },
);

const ProfilePage: NextPage = () => {
  const [selectedSport, setSelectedSport] = useState<SportTypeEnum | null>(
    SportTypeEnum.RUN,
  );
  const params = useRouter();
  const id: string[] | undefined = params.query['id'] as string[];
  const settingStore = useSettingsStore((store) => store.measurementUnits);

  const fetchAthlete = (id: string[] | undefined): Promise<IAthlete> => {
    if (id === undefined) {
      return pacebuddiesApi.get('bridge/athlete').then((result) => result.data);
    } else {
      return pacebuddiesApi
        .get(`bridge/athlete/${id[0]}`)
        .then((result) => result.data);
    }
  };
  const athleteQuery = useQuery<IAthlete>({
    queryKey: ['userProfileAthlete', id],
    queryFn: () => fetchAthlete(id),
  });

  const fetchActivities = (id: string[] | undefined): Promise<IActivity[]> => {
    if (id === undefined) {
      return pacebuddiesApi
        .get(`bridge/athlete/activities`, { params: { count: 5 } })
        .then((res) => res.data);
    }
    return pacebuddiesApi
      .get(`bridge/athlete/${id[0]}/activities`, { params: { count: 5 } })
      .then((res) => res.data);
  };

  const activitiesQuery = useQuery<IActivity[]>({
    queryKey: ['activities', id],
    queryFn: () => fetchActivities(id),
  });

  function fetchSports(id: string[] | undefined): Promise<string[]> {
    if (id === undefined) {
      return pacebuddiesApi
        .get('bridge/athlete/sportTypes')
        .then((result) => result.data);
    } else {
      return pacebuddiesApi
        .get(`bridge/athlete/${id[0]}/sportTypes`)
        .then((result) => result.data);
    }
  }

  function fetchActivitiesNumber(
    id: string[] | undefined,
    weeks: number,
  ): Promise<Record<'count', number>> {
    if (id === undefined) {
      return pacebuddiesApi
        .get('bridge/chart/ActivitiesSum', {
          params: { weeks: weeks },
        })
        .then((result) => {
          return result.data;
        });
    } else {
      return pacebuddiesApi
        .get(`bridge/chart/ActivitiesSum`, {
          params: { athlete_id: id[0], weeks: weeks },
        })
        .then((result) => result.data);
    }
  }

  const fetchClubs = (id: string[] | undefined): Promise<ClubsData[]> => {
    if (id === undefined) {
      return pacebuddiesApi
        .get('bridge/athlete/clubs')
        .then((result) => result.data);
    } else {
      return pacebuddiesApi
        .get(`bridge/athlete/${id[0]}/clubs`)
        .then((result) => result.data);
    }
  };

  const clubsQuery = useQuery<ClubsData[]>({
    queryKey: ['userProfileClubs', id],
    queryFn: () => fetchClubs(id),
  });

  const activitiesNumberQueryFor4Weeks = useQuery<Record<'count', number>>({
    queryKey: ['userProfileActivitiesNumber', id, 4],
    queryFn: () => fetchActivitiesNumber(id, 4),
  });

  const activitiesNumberQueryFor1Week = useQuery<Record<'count', number>>({
    queryKey: ['userProfileActivitiesNumber', id, 1],
    queryFn: () => fetchActivitiesNumber(id, 1),
  });

  const sportQuery = useQuery<string[]>({
    queryKey: ['userProfileSports', id],
    queryFn: () => fetchSports(id),
  });
  const sex = () => {
    if (athleteQuery.data?.sex == 'M') return 'Male';
    if (athleteQuery.data?.sex == 'F') return 'Female';
    return 'Not specified';
  };
  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
  };
  if (athleteQuery.isLoading) {
    return (
      <Layout>
        <div className="flex h-full shrink flex-col items-center justify-center bg-pb-gray">
          <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
            {/*<span>Naglowek</span>*/}
            <LoadingSpinner />
          </div>
        </div>
      </Layout>
    );
  }
  if (athleteQuery.isError) {
    return (
      <Layout>
        <div className="flex h-full shrink flex-col items-center justify-center bg-pb-gray">
          <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
            {/*<span>Naglowek</span>*/}
            <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray">
              No athlete found
            </span>
          </div>
        </div>
      </Layout>
    );
  } else if (athleteQuery.isSuccess) {
    if (athleteQuery.data === null) {
      return (
        <Layout>
          <div className="flex h-full shrink flex-col items-center justify-center bg-pb-gray">
            <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
              {/*<span>Naglowek</span>*/}
              <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray">
                No athlete found
              </span>
            </div>
          </div>
        </Layout>
      );
    }
  }

  return (
    <Layout>
      <div className="flex h-full shrink flex-col items-center justify-center bg-pb-gray">
        <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
          {/*<span>Naglowek</span>*/}
          <Image
            className="h-32 w-32 items-center border-2 border-pb-green"
            width={128}
            height={128}
            src={athleteQuery.data.profile ?? ''}
            alt="user avatar"
          />
          <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray">
            {`${athleteQuery.data.firstname ?? ''} ${
              athleteQuery.data.lastname ?? ''
            }`}
          </span>
        </div>
        <div className="flex h-full w-full justify-center border-t border-pb-green">
          <div className="flex h-full w-full flex-col items-center bg-white md:w-2/3">
            {/*number of activities + wykres ostatniego tygodnia*/}
            <div
              className="mt-2 flex flex-col items-center justify-between
                            space-y-4 md:space-x-10 lg:flex-row lg:space-y-0"
            >
              {/*number of activities*/}
              <div className="flex flex-col items-center justify-center">
                <span className="self-center whitespace-nowrap font-istok-web text-xl text-pb-dark-gray">
                  NUMBER OF ACTIVITIES
                </span>
                <div className="flex flex-row space-x-6">
                  <div className="flex flex-col">
                    <span className="self-center whitespace-nowrap font-istok-web text-4xl text-pb-orange">
                      {activitiesNumberQueryFor1Week.isSuccess
                        ? activitiesNumberQueryFor1Week.data.count
                        : 0}
                    </span>
                    <span className="self-center whitespace-nowrap font-istok-web text-base text-pb-dark-gray">
                      LAST WEEK
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="self-center whitespace-nowrap font-istok-web text-4xl text-pb-orange">
                      {activitiesNumberQueryFor4Weeks.isSuccess
                        ? activitiesNumberQueryFor4Weeks.data.count
                        : 0}
                    </span>
                    <span className="self-center whitespace-nowrap font-istok-web text-base text-pb-dark-gray">
                      LAST 4 WEEKS
                    </span>
                  </div>
                </div>
              </div>
              {/*wykres*/}
              <div className="flex items-center justify-center">
                {id ? (
                  <ActivitiesNumberIn4Weeks athleteId={id[0]} />
                ) : (
                  <ActivitiesNumberIn4Weeks />
                )}
              </div>
            </div>
            {/*PERSONAL INFO SECTION*/}
            <div className="mt-2 flex w-full flex-col items-start justify-start px-10 md:px-16">
              {/*PERSONAL INFO HEADER*/}
              <div className="flex w-full flex-col border-b-2 border-pb-green">
                <span className="justify-items-start justify-self-start whitespace-nowrap font-istok-web text-xl text-pb-green">
                  Personal info
                </span>
              </div>
              {/*CONTENT PERSONAL INFO*/}
              <div className="mt-2 flex w-full flex-col items-start justify-start space-y-2">
                {/*GENDER SECTION*/}
                <div className="flex flex-row items-center justify-center space-x-5  pl-16">
                  {/*Gender header*/}
                  <span className="flex items-center justify-center text-pb-green">
                    Gender
                  </span>
                  {/*Zmienna athletes.sex*/}
                  <span className="flex items-center justify-center text-pb-dark-gray">
                    {sex()}
                  </span>
                </div>
                {/*LOCATION SECTION*/}
                <div className="flex flex-row items-center justify-center space-x-5 pl-14">
                  {/*Location header*/}
                  <span className="flex items-center justify-center text-pb-green">
                    Location
                  </span>
                  {/*Zmienna athletes.city + woj + kraj?*/}
                  <span className="flex items-center justify-center text-pb-dark-gray">
                    {athleteQuery.isSuccess
                      ? `${athleteQuery.data.city}, ${athleteQuery.data.country}`
                      : 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
            {/*CLUBS*/}
            <div className="mt-2 flex w-full flex-col items-start justify-start px-10 md:px-16">
              {/*CLUBS HEADER*/}
              <div className="flex w-full flex-col border-b-2 border-pb-green">
                <span className="flex w-full justify-items-start justify-self-start whitespace-nowrap font-istok-web text-xl text-pb-green">
                  Clubs
                </span>
              </div>
              <div className="mt-2 grid w-full grid-cols-2 md:grid-cols-3">
                {clubsQuery.isSuccess &&
                  clubsQuery.data.map((club) => (
                    <a
                      key={club.url}
                      className="flex flex-col items-center break-words lg:flex-row"
                      href={`https://www.strava.com/clubs/${
                        club.url == '' ? club.id : club.url
                      }`}
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      <Image
                        src={club.profile_medium}
                        height={48}
                        width={48}
                        alt={club.name}
                        className="h-12 w-12 rounded-full bg-pb-orange"
                      />
                      <span className="items-center justify-center p-2 text-center font-bold text-pb-dark-gray md:justify-normal lg:text-left">
                        {club.name}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
            {/*SUMMARY OF ACTV SECTION*/}
            <div className="mt-2 flex w-full flex-col items-start justify-start px-10 md:px-16">
              {/*SUMMARY OF ACTV HEADER*/}
              <div className="flex w-full flex-col border-b-2 border-pb-green">
                <span className="justify-items-start justify-self-start whitespace-nowrap font-istok-web text-xl text-pb-green">
                  Summary of Activities
                </span>
              </div>
              {/*WYKRESY*/}
              <div className="mt-2 flex w-full flex-col items-center justify-center space-y-3">
                <div className="flex w-full flex-col items-center space-y-2">
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <span className="flex text-pb-dark-gray">
                      Show chart for sport type:{' '}
                    </span>
                    <Dropdown
                      label={capitalizeFirstLetter(
                        SportTypeMap.getString(selectedSport!)?.toLowerCase(),
                      )}
                      outline={true}
                      pill={true}
                      color={'success'}
                    >
                      {sportQuery.isSuccess &&
                        sportQuery.data.map((item) => (
                          <Dropdown.Item
                            key={item}
                            onClick={() =>
                              setSelectedSport(SportTypeMap.getNumber(item)!)
                            }
                          >
                            {' '}
                            {capitalizeFirstLetter(item.toLowerCase())}
                          </Dropdown.Item>
                        ))}
                    </Dropdown>
                  </div>
                  {id ? (
                    <WeekByDayDistanceChart
                      selectedSport={selectedSport}
                      athleteId={id[0]}
                    />
                  ) : (
                    <WeekByDayDistanceChart selectedSport={selectedSport} />
                  )}
                </div>
                <div>
                  {id ? (
                    <ActivitiesBySportType athleteId={id[0]} />
                  ) : (
                    <ActivitiesBySportType />
                  )}
                </div>
              </div>
            </div>
            {/*Latest Activities SECTION*/}
            <div className="mt-2 flex w-full flex-col items-start justify-start md:px-16">
              {/*Latest Activity HEADER*/}
              <div className="flex w-full px-10">
                <div className="flex w-full flex-col border-b-2 border-pb-green">
                  <span className="justify-items-start justify-self-start whitespace-nowrap font-istok-web text-xl text-pb-green">
                    Latest Activities
                  </span>
                </div>
              </div>
              {activitiesQuery.isSuccess && (
                <ClientOnlyActivities
                  activities={activitiesQuery.data}
                  unitPreference={settingStore}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ProfilePage;
