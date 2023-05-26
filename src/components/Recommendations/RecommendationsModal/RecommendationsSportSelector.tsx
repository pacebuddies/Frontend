import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../../internalTypes/SportTypeMap';
import { LoadingSpinner } from '../../LoadingSpinner';

interface IProps {
  onSportChange: (sport: SportTypeEnum[]) => void;
}

const RecommendationsSportSelector = ({ onSportChange }: IProps) => {
  const [selectedSport, setSelectedSport] = useState<SportTypeEnum[]>([]);

  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };

  const selectedSportHandler = (sport: SportTypeEnum) => {
    setSelectedSport((prevSelectedSports) => {
      if (prevSelectedSports.includes(sport)) {
        const newSelectedSports = prevSelectedSports.filter(
          (item) => item !== sport,
        );
        onSportChange(newSelectedSports);
        return newSelectedSports;
      } else {
        const newSelectedSports = [...prevSelectedSports, sport];
        onSportChange(newSelectedSports);
        return [...prevSelectedSports, sport];
      }
    });
  };

  const sportsQuery = useQuery({ queryKey: ['sports'], queryFn: fetchSports });

  const renderSportButton = (item: SportTypeEnum) => (
    <button
      key={item}
      onClick={() => selectedSportHandler(item)}
      className={`m-2 flex min-w-[3rem] shrink-0 flex-col items-center justify-center rounded-full bg-pb-green p-2 ${
        selectedSport.includes(item) ? 'bg-pb-orange' : ''
      }`}
    >
      <span>{SportTypeMap.getString(item)?.toLowerCase()}</span>
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
