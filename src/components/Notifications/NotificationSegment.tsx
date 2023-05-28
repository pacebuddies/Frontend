import {
  ExclamationCircleIcon,
  HandThumbUpIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { INotification } from '../../internalTypes/interfaces';
import { useSetMatchRecommendationStore } from '../../store/matchRecommendationsStore';
import RecommendationsModal from '../Recommendations/RecommendationsModal/RecommendationsModal';

interface IProps {
  data: INotification;
  markAsSeen: (arg: string) => void;
}

const NotificationSegment = ({ data, markAsSeen }: IProps) => {
  const [recommendationOpen, setRecommendationOpen] = useState(false);
  function parseDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = ('0' + date.getDate()).slice(-2);
    const monthNum = date.getMonth() + 1;
    const month = ('0' + monthNum).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const slectIcon = (action: string) => {
    switch (action) {
      case 'REQUEST_MATCH':
        return (
          <UserPlusIcon className="mr-3 flex h-8 w-8 shrink-0 rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green px-1 text-white" />
        );
      case 'ACCEPT_MATCH':
        return (
          <UserPlusIcon className="mr-3 flex h-8 w-8 shrink-0 rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green px-1 text-white" />
        );
      case 'UPVOTE':
        return (
          <HandThumbUpIcon className="mr-3 flex h-8 w-8 shrink-0 rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green px-1 text-white" />
        );
      default:
        return null;
    }
  };

  const getMatchedAthlete =
    useSetMatchRecommendationStore((state) => state.findMatch) ?? [];
  const recommendedAthlete = getMatchedAthlete(data.from_id);

  console.log(
    recommendedAthlete,
    'recommendedAthlete',
    data.athlete.id,
    'data.id',
  );
  return (
    <>
      {data.action == 'REQUEST_MATCH' ? (
        <button
          className="relative my-1 flex w-full items-center justify-center border-2 border-pb-green px-2 py-2.5"
          onClick={() => {
            if (!data.seen) {
              markAsSeen(data.id);
            }
          }}
        >
          {!data.seen && (
            <ExclamationCircleIcon className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full stroke-white text-pb-orange" />
          )}
          {slectIcon(data.action)}
          <div className="w-full flex-col">
            <div className="flex justify-between text-sm">
              <div className="text-pb-green">{data.title}</div>
              <div>{parseDate(data.date_time)}</div>
            </div>
            <div className="font-sans text-sm ">{data.content}</div>
            <button
              className="font-sans text-sm font-bold"
              onClick={() => setRecommendationOpen(true)}
            >
              Check him/her out here!
            </button>
          </div>
        </button>
      ) : (
        <button
          className="relative my-1 flex w-full items-center justify-center border-2 border-pb-green px-2 py-2.5"
          onClick={() => {
            if (!data.seen) {
              markAsSeen(data.id);
            }
          }}
        >
          {!data.seen && (
            <ExclamationCircleIcon className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full stroke-white text-pb-orange" />
          )}
          {slectIcon(data.action)}
          <div className="w-full flex-col">
            <div className="flex justify-between text-sm">
              <div className="text-pb-green">{data.title}</div>
              <div>{parseDate(data.date_time)}</div>
            </div>
            <div className="font-sans text-sm">{data.content}</div>
            <div>
              {/* {data.action == "REQUEST_MATCH" && (<div>XD</div>)} */}
            </div>
          </div>
        </button>
      )}
      {recommendationOpen && recommendedAthlete != undefined && (
        <RecommendationsModal
          data={[recommendedAthlete]}
          onOpenedChange={setRecommendationOpen}
        />
      )}
    </>
  );
};

export default NotificationSegment;
