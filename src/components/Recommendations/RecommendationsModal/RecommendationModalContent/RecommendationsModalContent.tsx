import Image from 'next/image';
import { RecommendationData } from '../../../../internalTypes/recommendationData';
import { SportTypeEnum } from '../../../../internalTypes/sportTypeEnum';
import CompatibilityNumber from './CompatibilityNumber';
import RecommendationsChart from './RecommendationsChart';
import RecommendationsUserInfo from './RecommendationsUserInfo';
import SameClubs from './SameClubs';
import SameSportTypes from './SameSportTypes';

import BestBuddySvg from './BuddyIcons/BestBuddy.svg';
import BuddySvg from './BuddyIcons/Buddy.svg';
import GoodBuddySvg from './BuddyIcons/GoodBuddy.svg';
import NiceBuddySvg from './BuddyIcons/NiceBuddy.svg';
interface IProps {
  data: RecommendationData[];
  num: number;
  reRender: number;
  selectedSports: SportTypeEnum[];
}

const RecommendationsModalContent = ({ data, num, selectedSports }: IProps) => {
  const number = num;
  console.log(number);

  const athlete: RecommendationData | undefined = data[number];

  // show message if there is no recommendations
  if (athlete === undefined || data.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <span>We have no recommendations for you 😢</span>
        <span>To get more you could try</span>
        <span>change your preferences</span>
        <span>change filtered sport type</span>
        <span>
          add more activities to your strava account and synchronize it with us
          😊
        </span>
      </div>
    );
  }



  return (
    <div className="flex h-full w-full flex-col">
      {/*Top block information*/}
      <div className="flex w-full flex-row">
        <RecommendationsUserInfo
          className="mb-4 flex w-4/5 flex-row justify-between border border-green-500 bg-white"
          country={athlete.country}
          city={athlete.city}
          firstname={athlete.firstname}
          lastname={athlete.lastname}
          profile={athlete.profile}
          sex={athlete.sex}
        />

      </div>
      {/*Bottom block information*/}
      <div className="flex w-full grow flex-wrap lg:flex-row lg:flex-nowrap">
        {/*Left block information*/}
        <div className="flex w-3/5 shrink flex-col border border-green-500 bg-white p-2 lg:w-2/5 lg:justify-between lg:p-8">
          <SameSportTypes
            className="flex w-full flex-col"
            sports={athlete.sport_types}
            selectedSports={selectedSports}
          />
          <div className="flex w-full flex-col lg:min-h-[50%]">
            <SameClubs clubs={athlete.clubs} />
          </div>
        </div>
        {/*Center block information / compatibility percent */}
        <div className="flex w-2/5 shrink-0 grow-0 items-end justify-center bg-white text-4xl font-bold text-pb-dark-gray md:text-5xl lg:mx-4 lg:w-[calc(20%-2rem)] lg:px-8 lg:text-6xl xl:text-7xl 2xl:text-8xl">
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg lg:text-2xl xl:text-3xl">
              Compatibility
            </span>
            <CompatibilityNumber num={athlete.compatibility} />
          </div>
        </div>
        {/*Right block information / chart*/}
        <div className="relative mt-4 min-h-[16rem] min-w-[10rem] flex-auto border border-green-500 bg-white p-8 lg:mt-0">
          <RecommendationsChart
            recommended_user_name={athlete.firstname}
            recommended_user_graph_data={athlete.recommended_graph_stats}
            user_graph_data={athlete.my_graph_stats}
            data={[20, 50, 60, 90, 65]}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModalContent;
