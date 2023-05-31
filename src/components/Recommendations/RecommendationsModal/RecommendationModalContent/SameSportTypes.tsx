import { useEffect, useState } from 'react';
import { SportTypeEnum } from '../../../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../../../internalTypes/SportTypeMap';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  sports: number[];
  selectedSports: SportTypeEnum;
  recommended_by: number;
}
interface ISportElement {
  sportNumber: number;
  selected: boolean;
}
const SameSportTypes = ({ recommended_by,sports, selectedSports, ...props }: IProps) => {
  const [filteredBySport, setFilteredBySport] = useState<ISportElement[]>([]);
  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
  };

  const uniqueSports = sports == null ? [] : [...new Set(sports)];
  const parsedSports = uniqueSports.map<ISportElement>((sport) => {
    if (selectedSports == sport) {
      return { sportNumber: sport, selected: true };
    }
    return { sportNumber: sport, selected: false };
    // return capitalizeFirstLetter(SportTypeMap.getString(sport)?.toLowerCase());
  });

  useEffect(() => {
    setFilteredBySport(parsedSports);
  }, [sports, selectedSports]);
  return (
    <div {...props}>
      <span className="text-lg font-bold text-pb-green">Activity types</span>
      <div className="flex flex-wrap px-2 lg:p-2">
        {filteredBySport.map((sport) => (
          <span
            key={sport.sportNumber}
            className={`m-1 rounded-full px-2 py-1 shadow-md lg:px-3 lg:py-2 ${
              sport.selected ? ' bg-pb-orange' : 'bg-gray-200'
            } ${
              sport.sportNumber === recommended_by ? 'border-2 border-pb-green' : ''
            }`}
          >
            {capitalizeFirstLetter(
              SportTypeMap.getString(sport.sportNumber)?.toLowerCase(),
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SameSportTypes;
