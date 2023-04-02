import pacebuddiesApi from '../../../instances/axiosConfigured';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';

interface IProps {
  user_id: string;
  sportType: SportTypeEnum;
  onAccepted: (id: string) => void;
}

const AcceptButton = ({user_id, sportType, onAccepted }: IProps) => {
  const acceptRecommendation = () => {
    pacebuddiesApi
      .post(`recommender/recommendations/match/accept`, {
        sport_type: sportType,
        recommendation_athlete_id: user_id,
      })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
    onAccepted(user_id);
  };

  return (
    <div className="flex h-10 w-32 items-center justify-center rounded-full bg-pb-gray">
      <button onClick={() => acceptRecommendation()}>
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-6 w-6 text-pb-green"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <span>Accept</span>
        </div>
      </button>
    </div>
  );
};

export default AcceptButton;
