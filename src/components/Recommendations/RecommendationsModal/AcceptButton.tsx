import pacebuddiesApi from '../../../instances/axiosConfigured';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import { HeartIcon } from "@heroicons/react/24/solid";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  sportType: SportTypeEnum;
  onAccepted: (id: string) => void;
  showed: boolean;
}

const AcceptButton = ({ userId, sportType, onAccepted, showed }: IProps) => {
  const acceptRecommendation = () => {
    pacebuddiesApi
      .post(`recommender/recommendations/match/accept`, {
        sport_type: sportType,
        recommendation_athlete_id: userId,
      })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
    onAccepted(userId);
  };

  return (
    <div
      className={`flex h-10 w-32 items-center justify-center rounded-full bg-pb-gray ${
        !showed && 'pointer-events-none opacity-0'
      }`}
    >
      <button onClick={() => acceptRecommendation()}>
        <div className="flex items-center justify-center">
          <HeartIcon className="mr-3 h-6 w-6 text-pb-green" />
          <span>Accept</span>
        </div>
      </button>
    </div>
  );
};

export default AcceptButton;
