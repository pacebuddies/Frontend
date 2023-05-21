import { RecommendationData } from '../../../../internalTypes/recommendationData';
import { SportTypeEnum } from '../../../../internalTypes/sportTypeEnum';
import CompatibilityNumber from './CompatibilityNumber';
import RecommendationsChart from './RecommendationsChart';
import RecommendationsUserInfo from './RecommendationsUserInfo';
import SameClubs from './SameClubs';
import SameSportTypes from './SameSportTypes';

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
      <RecommendationsUserInfo
        className="mb-4 flex w-4/5 flex-row justify-between border border-green-500 bg-white"
        country={athlete.country}
        city={athlete.city}
        firstname={athlete.firstname}
        lastname={athlete.lastname}
        profile={athlete.profile}
        sex={athlete.sex}
      />
      {/*Bottom block information*/}
      <div className="flex lg:flex-nowrap flex-wrap lg:flex-row w-full">
        {/*Left block information*/}
        <div className="flex w-4/5 lg:w-2/5 flex-col shrink lg:justify-between border border-green-500 bg-white p-2 lg:p-8">
          <SameSportTypes
            className="flex w-full flex-col"
            sports={athlete.sport_types}
            selectedSports={selectedSports}
          />
          <div className="flex lg:min-h-[50%] w-full flex-col">
            <SameClubs clubs={athlete.clubs} />
          </div>
        </div>
        {/*Center block information / compatibility percent */}
        <div
          className="lg:mx-4 flex shrink-0 grow-0 items-end lg:w-[calc(20% - 2rem)] justify-center bg-white lg:px-8 text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl "
        >
          <div className="font-bold text-pb-dark-gray ">
            <CompatibilityNumber num={athlete.compatibility} />
          </div>
        </div>
        {/*Right block information / chart*/}
        <div className="flex-auto  relative w-full lg:w-2/5 border border-green-500 bg-white p-8">
          <RecommendationsChart data={[20, 50, 60, 90, 65]} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModalContent;
