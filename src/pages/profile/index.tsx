import { NextPage } from 'next';
import StravaWatermark from '../../components/StravaWatermark';
import TopNavBar from '../../components/TopNavBar';
import MenuButton from '../../components/MenuButton';
import RecommendationsButton from '../../components/Recommendations/RecommendationsButton';
import pacebuddiesApi from '../../instances/axiosConfigured';
import Image from 'next/image';
import avatar from '/src/img/avatar-example.jpg';

const ProfilePage: NextPage = () => {


  return (
    <>
      <div className="flex h-screen shrink flex-col items-center justify-center bg-pb-gray">

        <TopNavBar />
        <div className="flex flex-col w-full space-y-3 shrink-0 h-56 items-center justify-center bg-gradient-to-r from-pb-orange via-white to-pb-green">
          {/*<span>Naglowek</span>*/}
          <img
            className="w-32 h-32 items-center border-pb-green border-2"
            src={avatar.src}
            alt="user avatar"
          />
          <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray">
            John Doe
          </span>

        </div>
        <div className="flex w-full h-full justify-center border-2 border-t-pb-green">
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
            <div className="flex flex-col items-center justify-center mt-2">
              {/*PERSONAL INFO HEADER*/}
              <span className="justify-self-start whitespace-nowrap font-istok-web text-pb-green text-xl">
                Personal info
              </span>
            </div>
          </div>
        </div>

      </div>
      <RecommendationsButton />
      <MenuButton />
    </>
  );
};
export default ProfilePage;
