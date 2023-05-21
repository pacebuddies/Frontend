import { useEffect, useState } from "react";
import { SportTypeEnum } from '../../../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../../../internalTypes/SportTypeMap';

interface IProps extends React.HTMLAttributes<HTMLDivElement>{
  sports: number[];
  selectedSports: SportTypeEnum[];
}
interface ISportElement {
  sportNumber: number;
  selected: boolean;
}
const SameSportTypes = ({ sports, selectedSports, ...props }: IProps) => {
  const [filteredBySport, setFilteredBySport] = useState<ISportElement[]>([]);
  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
  };

  const uniqueSports = sports == null ? [] : [...new Set(sports)];
  const parsedSelectedSports = selectedSports == null ? [] : selectedSports;
  const parsedSports = uniqueSports.map<ISportElement>((sport) => {
    if (parsedSelectedSports.includes(sport)) {
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
      <span className="font-bold text-pb-green">Activity types</span>
      <div className="flex flex-wrap p-1 lg:p-2">
        {parsedSports.map((sport) => (
          <span
            key={sport.sportNumber}
            className={`px-1 lg:p-2 ${sport.selected ? 'bg-gray-200' : ''}`}
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
