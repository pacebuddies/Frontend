import { useState } from 'react';
import RangeSlider from './RangeSlider';

interface IProps {
  default_min: number;
  default_max: number;
  user_min: number;
  user_max: number;
  text: string;
  scale?: 'small' | 'large';
}

function RecommendationFilterRangeSlider({
  default_min,
  default_max,
  user_max,
  user_min,
  text,
  scale = 'small',
}: IProps) {
  const [value, setValue] = useState(
    scale === 'small'
      ? {
          min: Math.round(user_min * 100),
          max: Math.round(user_max * 100),
        }
      : {
          min: Math.round(user_min),
          max: Math.round(user_max),
        },
  );


  const min: number = scale === 'small' ? 0 : 0;
  let max: number;
  // if the user_max is less than 100, then the slider should be scaled to 100
  // if the user_max is greater than 100, then the slider should be scaled to rounded user_max
  if (user_max < 100) {
    max = scale === 'small' ? 100 * 100 : 100;
  } else {
    max = scale === 'small' ? Math.round(user_max * 100) : Math.round(user_max);
  }
  return (
    <>
      <div>
        <span className="pl-8 text-pb-dark-gray">{text}</span>
      </div>
      <div className="flex w-72 shrink-0 flex-row">
        <span className="m-1 inline-block min-w-[2.5rem] shrink-0 text-center">
          {scale === 'small' ? value.min / 100 : value.min}
        </span>
        <RangeSlider
          step={10}
          min={min}
          max={max}
          value={value}
          default_min={
            scale === 'small' ? Math.round(default_min * 100) : default_min
          }
          default_max={
            scale === 'small' ? Math.round(default_max * 100) : default_max
          }
          onChange={setValue}
        />
        <span className="m-1 inline-block min-w-[1.1rem] shrink-0 text-center">
          {scale === 'small' ? value.max / 100 : value.max}
        </span>
      </div>
    </>
  );
}

export default RecommendationFilterRangeSlider;
