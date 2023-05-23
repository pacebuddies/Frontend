import { useQuery } from '@tanstack/react-query';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { FilterOffset, SportTypeFilterRanges } from "../../internalTypes/sportTypeFilterRanges";
import DoubleSlider from '../Slider/DoubleSlider';
import { useEffect, useState } from "react";

interface IProps {
  title: string;
  // filterData: SportTypeFilterRanges;
  sportType: SportTypeEnum;
}

const FilterSportBlock = ({ title, sportType }: IProps) => {
  const [userFilterOffset, setUserFilterOffset] = useState<FilterOffset|null>(null);

  const fetchSportData = (): Promise<SportTypeFilterRanges> => {
    return pacebuddiesApi
      .get('recommender/recommendations/getFilter', {
        params: {
          sport_type: sportType,
        },
      })
      .then((res) => res.data);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['filterData', sportType],
    queryFn: fetchSportData,
  });

  useEffect(() => {
    if (!data) return;

    setUserFilterOffset({...offsetData});
  }, [data]);

  if (!isSuccess) return null;
  const filterData = data.filter_settings_model;
  const offsetData = data.filter_offset;

  console.log(data);
  return (
    <div className="flex w-full flex-col">
      <div>
        <span>{title}</span>
      </div>
      {/*Average distance slider*/}
      <div>
        <span>Average distance</span>
        <div className="w-full pt-4">
          <DoubleSlider
            step={1}
            value={{
              min: userFilterOffset?.avg_distance_min ?? 0,
              max: userFilterOffset?.avg_distance_max ?? 0,
            }}
            minBracketValue={filterData.avg_distance_min}
            maxBracketValue={filterData.avg_distance_max}
            minSteps={[-20, -15, -10, -5, 0]}
            maxSteps={[0, 5, 10, 15, 20]}
            minStep={5}
            maxStep={5}
            onChange={(values) => console.log(values)}
          />
        </div>
      </div>
    </div>
  );
};
export default FilterSportBlock;
