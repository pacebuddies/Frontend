import { NextPage } from 'next';
import StravaWatermark from '../../components/StravaWatermark';
import TopNavBar from '../../components/TopNavBar';
import MenuButton from '../../components/MenuButton';
import RecommendationsButton from '../../components/Recommendations/RecommendationsButton';
import pacebuddiesApi from '../../instances/axiosConfigured';

const ProfilePage: NextPage = () => {


  return (
    <>
      <div className="flex h-screen shrink flex-col items-center justify-center bg-pb-gray">

        <TopNavBar />
        <div className="flex w-full h-32 items-center justify-center bg-gray-100">
          <span>Naglowek</span>
        </div>
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex h-full w-2/3 bg-blue-800">
           Tresc
          </div>
        </div>

      </div>
      <RecommendationsButton />
      <MenuButton />
    </>
  );
};
export default ProfilePage;
