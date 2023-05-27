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

      {isSuccess &&
        data.map((match) => (
          <>
            <div className="flex w-full flex-col md:pl-10">
              <div className="mb-1 flex w-2/3 border-t-2 border-t-pb-green md:w-1/2" />
              <span className="flex text-xl text-pb-green">
                Matches for{' '}
                {capitalizeFirstLetter(SportTypeMap.getString(sportType))}
              </span>
            </div>
            <MatchSegment
              key={match.id}
              athlete={match}
              className="w-full px-2 md:px-10"
            />
          </>
        ))}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default MatchList;
