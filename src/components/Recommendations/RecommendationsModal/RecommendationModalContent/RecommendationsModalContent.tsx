import { RecommendationData } from '../../../../internalTypes/recommendationData';
import CompatibilityNumber from './CompatibilityNumber';
import RecommendationsChart from './RecommendationsChart';
import RecommendationsUserInfo from './RecommendationsUserInfo';
import SameClubs from './SameClubs';
import SameSportTypes from './SameSportTypes';

interface IProps {
  data: RecommendationData[];
  num: number;
  reRender: number;
}

const RecommendationsModalContent = ({ data, num }: IProps) => {
  const number = num;
  console.log(number);

  const athlete: RecommendationData | undefined = data[number];
  if (athlete === undefined || data.length === 0) {
    return <div>Brak danych</div>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/*Top block information*/}
      <RecommendationsUserInfo
        country={athlete.country}
        city={athlete.city}
        firstname={athlete.firstname}
        lastname={athlete.lastname}
        profile={athlete.profile}
        sex={athlete.sex}
      />
      {/*Bottom block information*/}
      <div className="flex grow">
        {/*Left block information*/}
        <div className=" flex w-2/5 flex-col justify-between border border-green-500 bg-white p-8">
          <SameSportTypes />
          <div className="flex min-h-[50%] w-full flex-col">
            <SameClubs clubs={athlete.clubs} />
          </div>
        </div>
        {/*Center block information / compatibility percent */}
        <div
          className="mx-4 flex shrink-0 grow-0 items-center justify-center  bg-white p-8 text-8xl md:pt-52 "
          style={{ width: 'calc(20% - 2rem)' }}
        >
          <div className="font-bold text-pb-dark-gray">
            <CompatibilityNumber num={athlete.compatibility} />
          </div>
        </div>
        {/*Right block information / chart*/}
        <div className="relative w-2/5 border border-green-500 bg-white p-8">
          <RecommendationsChart data={[20, 50, 60, 90, 65]} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModalContent;
