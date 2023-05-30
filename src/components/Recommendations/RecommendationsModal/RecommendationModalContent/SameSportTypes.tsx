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
      <span className="font-bold text-pb-green text-lg">Activity types</span>
      <div className="flex flex-wrap px-2 lg:p-2">
        {parsedSports.map((sport) => (
          <span
            key={sport.sportNumber}
            className={`px-2 py-1 m-1 shadow-md rounded-full lg:px-3 lg:py-2 ${sport.selected ? ' bg-pb-orange' : 'bg-gray-200'}`}
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
