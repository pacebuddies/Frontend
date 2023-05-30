import pacebuddiesApi from '../../../instances/axiosConfigured';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';

interface IProps {
  userId: string;
  sportType: SportTypeEnum;
  onDeclined: (id: string) => void;
  showed: boolean;
}

const DeclineButton = ({ userId, sportType, onDeclined, showed }: IProps) => {
  const declineRecommendation = () => {
    pacebuddiesApi
      .post(`recommender/recommendations/match/decline`, {
        sport_type: sportType,
        recommendation_athlete_id: userId,
      })
      .then((r) => {
      })
      .catch((err) => {
      });
    onDeclined(userId);
  };

  return (
    <div className={`ml-20 flex h-10 w-32 items-center justify-center rounded-full bg-pb-gray ${!showed && 'opacity-0 pointer-events-none'}`}>
      <button onClick={() => declineRecommendation()}>
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-6 w-6 text-pb-red-discard"
          >
            <path
              fillRule="evenodd"
              d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z"
              clipRule="evenodd"
            />
          </svg>
          <span>Decline</span>
        </div>
      </button>
    </div>
  );
};

export default DeclineButton;
