import { useQuery } from '@tanstack/react-query';
import React from 'react';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { MatchData } from '../../internalTypes/matchData';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';
import { LoadingSpinner } from '../LoadingSpinner';
import MatchSegment from './MatchSegment';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  sportType: SportTypeEnum;
}

const fetchMatches = (sportType: SportTypeEnum): Promise<MatchData[]> => {
  return pacebuddiesApi
    .get(`recommender/recommendations/listMatches`, {
      params: {
        sport_type: sportType,
      },
    })
    .then((response) => response.data);
};

const MatchList = ({ sportType, ...props }: IProps) => {
  const { data, isSuccess, isLoading } = useQuery<MatchData[]>({
    queryKey: ['matches', sportType],
    queryFn: () => fetchMatches(sportType),
  });
  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
  };
  return (
    <div {...props}>
      {isSuccess && data.length !== 0 && (
        <div className="mb-1 flex w-full flex-col pl-2 md:pl-10">
          <div className="mb-1 flex w-2/3 border-t-2 border-t-pb-green md:w-1/2" />
          <span className="flex text-xl text-pb-green">
            Matches for{' '}
            {capitalizeFirstLetter(
              SportTypeMap.getString(sportType)?.toLowerCase(),
            )}
          </span>
        </div>
      )}
      {isSuccess &&
        data.map((match) => (
          <MatchSegment
            key={match.id}
            athlete={match}
            sportType={sportType}
            className="w-full px-2 md:px-10"
          />
        ))}
      {isLoading && (
        <div className="flex w-full flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isSuccess && data.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center">
          <span className="text-xl text-pb-dark-gray">
            No matches for{' '}
            {capitalizeFirstLetter(
              SportTypeMap.getString(sportType)?.toLowerCase(),
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default MatchList;
