import { useState } from 'react';
import RangeSlider from './RangeSlider';

interface IProps {
  default_min: number;
  default_max: number;
  user_min: number;
  user_max: number;
  text: string;
}
function RecommendationFilterRangeSlider({
  default_min,
  default_max,
  user_max,
  user_min,
  text,
}: IProps) {
  const [value, setValue] = useState({ min: user_min, max: user_max });
  return (
    <>
      <div>
        <span className="pl-8 text-pb-dark-gray">{text}</span>
      </div>
      <div className="flex w-72 shrink-0 flex-row">
        <span className="m-1 inline-block min-w-[1.1rem] shrink-0 text-center">
          {value.min}
        </span>
        <RangeSlider
          step={1}
          min={0}
          max={100}
          value={value}
          default_min={default_min}
          default_max={default_max}
          onChange={setValue}
        />
        <span className="m-1 inline-block min-w-[1.1rem] shrink-0 text-center">
          {value.max}
        </span>
      </div>
    </>
  );
}

export default RecommendationFilterRangeSlider;
