import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import WeekByDayDistanceChart from '../../components/Charts/Distance/WeekByDayDistanceSumChart';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { IAthlete } from '../../internalTypes/interfaces';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';
import Layout from '../../Layout';
import ActivitiesBySportType from "../../components/Charts/Activities/ActivitiesBySportType";
import { useSession } from "next-auth/react";

const ProfilePage: NextPage = () => {
  const [selectedSport, setSelectedSport] = useState<SportTypeEnum | null>(
    SportTypeEnum.RUN,
  );
  const params = useRouter();

  const id: string[] | undefined = params.query['id'] as string[];
  const session = useSession();

  if (session.status === "authenticated"){
    console.log(session);
  }

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

  const sportQuery = useQuery<string[]>({
    queryKey: ['userProfileSports', id],
    queryFn: () => fetchSports(id),
  });
  console.log(sportQuery.data);
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

  return (
    <Layout>
      <div className="flex h-full shrink flex-col items-center justify-center bg-pb-gray">
        <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
          {/*<span>Naglowek</span>*/}
          <Image
            className="h-32 w-32 items-center border-2 border-pb-green"
            width={128}
            height={128}
            src={athleteQuery.data?.profile ?? ''}
            alt="user avatar"
          />
          <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray">
            {`${athleteQuery.data?.firstname ?? ''} ${
              athleteQuery.data?.lastname ?? ''
            }`}
          </span>
        </div>
        <div className="flex h-full w-full justify-center border-t border-pb-green">
          <div className="flex h-full w-full flex-col items-center bg-white md:w-2/3">
            {/*number of activities + wykres ostatniego tygodnia*/}
            <div
              className="mt-2 flex flex-col items-center justify-between
                            space-y-4 md:flex-row md:space-x-14 md:space-y-0"
            >
              {/*number of activities*/}
              <div className="flex w-1/2 flex-col items-center justify-center">
                <span className="self-center whitespace-nowrap font-istok-web text-xl text-pb-dark-gray">
                  NUMBER OF ACTIVITIES
                </span>
                <div className="flex flex-row space-x-6">
                  <div className="flex flex-col">
                    <span className="self-center whitespace-nowrap font-istok-web text-4xl text-pb-orange">
                      4
                    </span>
                    <span className="self-center whitespace-nowrap font-istok-web text-base text-pb-dark-gray">
                      LAST WEEK
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="self-center whitespace-nowrap font-istok-web text-4xl text-pb-orange">
                      15
                    </span>
                    <span className="self-center whitespace-nowrap font-istok-web text-base text-pb-dark-gray">
                      LAST 4 WEEKS
                    </span>
                  </div>
                </div>
              </div>
              {/*wykres*/}
              <div className="flex items-center justify-center">
                <span className="self-center whitespace-nowrap font-istok-web text-xl italic text-pb-dark-gray">
                  WYKRES
                </span>
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
                    {athleteQuery.isSuccess ? (`${athleteQuery.data.city}, ${athleteQuery.data.country}`  ) : 'Not specified'}
                  </span>
                </div>
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
                <span className="flex text-lg text-pb-dark-gray">
                  Distance per day
                </span>
                <div>
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
                  {id ? (
                    <WeekByDayDistanceChart
                      selectedSport={selectedSport}
                      athleteId={id[0]}
                    />
                  ) : (
                    <WeekByDayDistanceChart selectedSport={selectedSport} />
                  )}
                </div>
                <span className="flex text-lg text-pb-dark-gray">
                  Sports Type
                </span>
                <div>
                  {/*<ActivitiesBySportType athleteId={}/>*/}
                </div>
              </div>
            </div>
            {/*Latest Activities SECTION*/}
            <div className="mt-2 flex w-full flex-col items-start justify-start px-10 md:px-16">
              {/*Latest Activity HEADER*/}
              <div className="flex w-full flex-col border-b-2 border-pb-green">
                <span className="justify-items-start justify-self-start whitespace-nowrap font-istok-web text-xl text-pb-green">
                  Latest Activities
                </span>
              </div>
              <div className="flex flex-col items-center justify-center"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ProfilePage;
