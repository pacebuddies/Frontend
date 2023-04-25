import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../../internalTypes/SportTypeMap';

interface IProps {
  onSportChange: (sport: SportTypeEnum | null) => void;
}

const RecommendationsSportSelector = ({ onSportChange }: IProps) => {
  const [selectedSport, setSelectedSport] = useState<SportTypeEnum | null>(
    null,
  );

  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };

  const selectedSportHandler = (sport: SportTypeEnum) => {
    setSelectedSport((prevSelectedSport) => {
      if (sport === prevSelectedSport) {
        onSportChange(null);
        return null;
      }
      onSportChange(sport);
      return sport;
    });
  };

  const sportsQuery = useQuery({ queryKey: ['sports'], queryFn: fetchSports });

  const renderSportButton = (item: SportTypeEnum) => (
    <button
      key={item}
      onClick={() => selectedSportHandler(item)}
      className={`flex flex-col items-center justify-center p-2 ${
        selectedSport === item ? 'bg-gray-200' : ''
      }`}
    >
      <span title={SportTypeMap.getString(item)?.toLowerCase()}>
        {SportTypeMap.getString(item)?.toUpperCase()[0]}
      </span>
      <span>{item}</span>
    </button>
  );

  return sportsQuery.isSuccess ? (
    <>
      {sportsQuery.data
        .map((item) => SportTypeMap.getNumber(item)! as SportTypeEnum)
        .map(renderSportButton)}
    </>
  ) : (
    <div>
      {sportsQuery.isError && (
        <div>
          error :{' '}
          {
            // @ts-expect-error
            sportsQuery.error!.message
          }
        </div>
      )}
      {sportsQuery.isLoading && <div>loading...</div>}
    </div>
  );
};

export default RecommendationsSportSelector;
