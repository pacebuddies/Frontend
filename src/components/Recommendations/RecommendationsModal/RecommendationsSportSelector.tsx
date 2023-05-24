import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../../internalTypes/SportTypeMap';

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
      className={`flex flex-col items-center justify-center p-2 ${
        selectedSport.includes(item) ? 'bg-gray-200' : ''
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
      {sportsQuery.isLoading && (
        <svg
          className={`-ml-1 mr-3 h-12 w-12 animate-spin text-gray-400 `}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default RecommendationsSportSelector;
