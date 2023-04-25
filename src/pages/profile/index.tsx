import {NextPage} from 'next';
import StravaWatermark from '../../components/StravaWatermark';
import TopNavBar from '../../components/TopNavBar';
import MenuButton from '../../components/MenuButton';
import RecommendationsButton from '../../components/Recommendations/RecommendationsButton';
import pacebuddiesApi from '../../instances/axiosConfigured';
import Image from 'next/image';
import avatar from '/src/img/avatar-example.jpg';
import { useQuery } from '@tanstack/react-query';
import {IAthlete} from "../../internalTypes/interfaces";
import {promises} from "dns";

const ProfilePage: NextPage = () => {
  const fetchAthlete = ():Promise<IAthlete> => {return pacebuddiesApi.get("bridge/athlete").then((result) => result.data)}
  const athleteQuery = useQuery<IAthlete>({queryKey: ["userProfileAthlete"], queryFn: fetchAthlete})

  return (
    <>
      <div className="flex h-full shrink flex-col items-center justify-center bg-pb-gray">

        <TopNavBar/>
        <div
          className="flex flex-col w-full space-y-3 shrink-0 h-56 items-center justify-center bg-gradient-to-r from-pb-orange via-white to-pb-green">
          {/*<span>Naglowek</span>*/}
          <img
            className="w-32 h-32 items-center border-pb-green border-2"
            src={athleteQuery.data?.profile}
            alt="user avatar"
          />
          <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray">
            {`${athleteQuery.data?.firstname} ${athleteQuery.data?.lastname}`}
          </span>

        </div>
        <div className="flex w-full h-full justify-center border-t border-pb-green">
          <div className="flex flex-col h-full w-full md:w-2/3 bg-white items-center">
            {/*number of activities + wykres ostatniego tygodnia*/}
            <div className="flex flex-col md:flex-row items-center justify-between
                            md:space-x-14 mt-2 space-y-4 md:space-y-0">
              {/*number of activities*/}
              <div className="flex flex-col w-1/2 items-center justify-center">
                <span className="self-center whitespace-nowrap font-istok-web text-xl text-pb-dark-gray">
                  NUMBER OF ACTIVITIES
                </span>
                <div className="flex flex-row space-x-6">
                  <div className="flex flex-col">
                    <span className="self-center whitespace-nowrap font-istok-web text-4xl text-pb-orange">
                      4
                    </span>
                    <span className="self-center whitespace-nowrap font-istok-web text-m text-pb-dark-gray">
                      LAST WEEK
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="self-center whitespace-nowrap font-istok-web text-4xl text-pb-orange">
                      15
                    </span>
                    <span className="self-center whitespace-nowrap font-istok-web text-m text-pb-dark-gray">
                      LAST 4 WEEKS
                    </span>
                  </div>
                </div>
              </div>
              {/*wykres*/}
              <div className="flex items-center justify-center">
                <span className="self-center whitespace-nowrap font-istok-web text-pb-dark-gray text-xl italic">
                  WYKRES
                </span>
              </div>
            </div>
            {/*PERSONAL INFO SECTION*/}
            <div className="flex flex-col w-full items-start justify-start mt-2 px-10 md:px-16">
              {/*PERSONAL INFO HEADER*/}
              <div className="flex flex-col w-full border-b-2 border-pb-green">
                <span
                  className="justify-self-start justify-items-start whitespace-nowrap font-istok-web text-pb-green text-xl">
                  Personal info
                </span>
              </div>
              {/*CONTENT PERSONAL INFO*/}
              <div className="flex flex-col w-full items-start justify-start space-y-2 mt-2">
                {/*GENDER SECTION*/}
                <div className="flex flex-row items-center justify-center space-x-5  pl-16">
                  {/*Gender header*/}
                  <span className="flex items-center justify-center text-pb-green">
                    Gender
                  </span>
                  {/*Zmienna athletes.sex*/}
                  <span className="flex items-center justify-center text-pb-dark-gray">
                    Male
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
                    Toruń
                  </span>
                </div>
              </div>
            </div>
            {/*SUMMARY OF ACTV SECTION*/}
            <div className="flex flex-col w-full items-start justify-start mt-2 px-10 md:px-16">
              {/*SUMMARY OF ACTV HEADER*/}
              <div className="flex flex-col w-full border-b-2 border-pb-green">
                <span
                  className="justify-self-start justify-items-start whitespace-nowrap font-istok-web text-pb-green text-xl">
                  Summary of Activities
                </span>
              </div>
              {/*WYKRESY*/}
              <div className="flex flex-col w-full items-center justify-center mt-2 space-y-3">
                <span className="flex text-pb-dark-gray text-lg">Distance per day</span>
                <span className="flex text-xl italic">Wykres1</span>
                <span className="flex text-pb-dark-gray text-lg">Sports Type</span>
                <span className="flex text-xl italic">Wykres2</span>
              </div>
            </div>
            {/*Latest Activities SECTION*/}
            <div className="flex flex-col w-full items-start justify-start mt-2 px-10 md:px-16">
              {/*Latest Activity HEADER*/}
              <div className="flex flex-col w-full border-b-2 border-pb-green">
                <span
                  className="justify-self-start justify-items-start whitespace-nowrap font-istok-web text-pb-green text-xl">
                  Latest Activities
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">

              </div>
            </div>
          </div>
        </div>

      </div>
      <RecommendationsButton/>
      <MenuButton/>
    </>
  );
};
export default ProfilePage;
