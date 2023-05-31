import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../../internalTypes/SportTypeMap';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { LoadingSpinner } from '../../LoadingSpinner';

interface IProps {
  onSportChange: (sport: SportTypeEnum) => void;
}

const RecommendationsSportSelector = ({ onSportChange }: IProps) => {
  const [selectedSport, setSelectedSport] = useState<SportTypeEnum>(0);

  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };

  const selectedSportHandler = (sport: SportTypeEnum) => {
    setSelectedSport((prevSelectedSports) => {
      if (prevSelectedSports === sport) {
        onSportChange(0);
        return 0;
      }else {
        onSportChange(sport);
        return sport;
      }
    });
  };

  const sportsQuery = useQuery({ queryKey: ['sports'], queryFn: fetchSports });

  const renderSportButton = (item: SportTypeEnum) => (
    <button
      key={item}
      onClick={() => selectedSportHandler(item)}
      className={`m-2 flex min-w-[3rem] shrink-0 flex-col items-center justify-center rounded-full  p-2 ${
        selectedSport == item
          ? 'bg-pb-green'
          : 'border-2 border-white bg-white/80'
      }`}
    >
      <span>
        {capitalizeFirstLetter(SportTypeMap.getString(item)?.toLowerCase())}
      </span>
    </button>
  );

  return sportsQuery.isSuccess ? (
    <div className="flex h-12 flex-row overflow-hidden overflow-x-auto overscroll-contain ">
      {sportsQuery.data
        .map((item) => SportTypeMap.getNumber(item)! as SportTypeEnum)
        .map(renderSportButton)}
    </div>
  ) : (
    <div className="flex h-12 flex-row">
      {sportsQuery.isError && (
        <div>
          error :{' '}
          {
            // @ts-expect-error
            sportsQuery.error!.message
          }
        </div>
      )}
      {sportsQuery.isLoading && <LoadingSpinner />}
    </div>
  );
};

export default RecommendationsSportSelector;
