import { useEffect, useState } from 'react';
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
  const [changed, setChanged] = useState(false);
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
    max =
      scale === 'small'
        ? Math.round(user_max * 100)
        : Math.round(user_max) + 10;
  }

  const reset = () => {
    setValue({
      min: scale === 'small' ? Math.round(default_min * 100) : default_min,
      max: scale === 'small' ? Math.round(default_max * 100) : default_max,
    });
    setChanged(false);
  };

  useEffect(() => {
    const epsilon = 0.01;
    const isChanged =
      Math.abs(user_min * 100 - default_min * 100) > epsilon ||
      Math.abs(user_max * 100 - default_max * 100) > epsilon;
    setChanged(isChanged);
  }, [user_min, user_max, default_min, default_max]);

  useEffect(() => {
    const epsilon = 0.01;
    const isChanged =
      scale === 'small'
        ? Math.abs(value.min - Math.round(default_min * 100)) > epsilon ||
          Math.abs(value.max - Math.round(default_max * 100)) > epsilon
        : Math.abs(value.min * 100 - Math.round(default_min * 100)) > epsilon ||
          Math.abs(value.max * 100 - Math.round(default_max * 100)) > epsilon;
    setChanged(isChanged);
  }, [value, default_min, default_max, scale]);

  return (
    <>
      <div>
        <span className="pl-8 text-pb-dark-gray">{text}</span>
      </div>
      <div className="flex w-72 shrink-0 flex-row">
        <span className="m-1 inline-block min-w-[2.5rem] shrink-0 text-right">
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
        <span className="m-1 inline-block min-w-[2.5rem] shrink-0 text-left">
          {scale === 'small' ? value.max / 100 : value.max}
        </span>
        <button
          className="my-auto mr-auto ml-2 h-5 w-5 text-pb-dark-gray disabled:text-pb-gray"
          disabled={!changed}
          onClick={reset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default RecommendationFilterRangeSlider;
