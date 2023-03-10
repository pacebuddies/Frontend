import { NextPage } from 'next';
import MenuButton from '../../components/MenuButton';
import RecommendationsButton from '../../components/Recommendations/RecommendationsButton';
import TopNavBar from '../../components/TopNavBar';

const SettingsPage: NextPage = () => {
  return (
    <>
      <TopNavBar />
      <div className="mt-[91px] flex">
        {/*Options tabs*/}
        <div className="grid grid-rows-2 grid-flow-col h-screen w-72 bg-pb-gray/50">
          <div className="bg-red-100">Tab 1</div>
          <div className="bg-green-800">Tab 2</div>
        </div>
        <div>Settings</div>
      </div>
      <RecommendationsButton />
      <MenuButton />
    </>
  );
};
export default SettingsPage;
