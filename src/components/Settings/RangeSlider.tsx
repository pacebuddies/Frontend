import React, { useEffect, useState } from 'react';

interface IProps {
  step: number;
  min: number;
  max: number;
  default_min?: number;
  default_max?: number;
  value?: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}

const RangeSlider = ({
  min,
  max,
  default_min,
  default_max,
  value,
  step,
  onChange,
}: IProps) => {
  const [minValue, setMinValue] = useState(value ? value.min : min);
  const [maxValue, setMaxValue] = useState(value ? value.max : max);

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    if (!value) setMinValue(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    if (!value) setMaxValue(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  if (default_min === undefined) default_min = min;
  if (default_max === undefined) default_max = max;

  let default_minPos = ((default_min - min) / (max - min)) * 100;
  let default_maxPos = ((default_max - min) / (max - min)) * 100;

  // console.log(default_minPos, default_maxPos)

  if (default_min < minValue) {
    default_minPos = minPos;
  }
  if (default_max > maxValue) {
    default_maxPos = maxPos;
  }

  return (
    <div className="wrapper">
      <div className="input-wrapper">
        <input
          className="input"
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className="input"
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className="control-wrapper">
        <div className="control" style={{ left: `${minPos}%` }} />
        <div className="rail">
          <div
            className="inner-rail bg-pb-orange"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
          <div
            className="inner-rail bg-pb-green"
            style={{
              left: `${default_minPos}%`,
              right: `${100 - default_maxPos}%`,
            }}
          />
        </div>
        <div className="control" style={{ left: `${maxPos}%` }} />
        <span
          className="absolute  h-4 w-1 -translate-x-1/2 rounded-full bg-current opacity-70 "
          style={{ left: `${(0 / 6) * 100}%` }}
        ></span>
        <span
          className="absolute top-3 mt-2 -translate-x-1/2 text-xs"
          style={{ left: `${(0 / 6) * 100}%` }}
        >
          -20
        </span>
        <span
          className="absolute  h-4 w-1 -translate-x-1/2 rounded-full bg-current opacity-70 "
          style={{ left: `${(1 / 6) * 100}%` }}
        ></span>
        <span
          className="absolute top-3 mt-2 -translate-x-1/2 text-xs"
          style={{ left: `${(1 / 6) * 100}%` }}
        >
          -10
        </span>
        <span
          className="absolute  h-4 w-1 -translate-x-1/2 rounded-full bg-current opacity-70"
          style={{ left: `${(2 / 6) * 100}%` }}
        ></span>
        <span
          className="absolute top-3 mt-2 -translate-x-1/2 text-xs"
          style={{ left: `${(2 / 6) * 100}%` }}
        >
          0
        </span>
        <span
          className="absolute  h-4 w-1 -translate-x-1/2 rounded-full bg-current opacity-70"
          style={{ left: `${(3 / 6) * 100}%` }}
        ></span>
        <span
          className="absolute top-3 mt-2 -translate-x-1/2 text-xs"
          style={{ left: `${(3 / 6) * 100}%` }}
        >
          0
        </span>
        <span
          className="absolute  h-4 w-1 -translate-x-1/2 rounded-full bg-current opacity-70"
          style={{ left: `${(4 / 6) * 100}%` }}
        ></span>
        <span
          className="absolute top-3 mt-2 -translate-x-1/2 text-xs"
          style={{ left: `${(4 / 6) * 100}%` }}
        >
          0
        </span>
        <span
          className="absolute  h-4 w-1 -translate-x-1/2 rounded-full bg-current opacity-70"
          style={{ left: `${(5 / 6) * 100}%` }}
        ></span>
        <span
          className="absolute top-3 mt-2 -translate-x-1/2 text-xs"
          style={{ left: `${(5 / 6) * 100}%` }}
        >
          +10
        </span>
        <span
          className="absolute  h-4 w-1 -translate-x-1/2 rounded-full bg-current opacity-70"
          style={{ left: `${1 * 100}%` }}
        ></span>
        <span
          className="absolute top-3 mt-2 -translate-x-1/2 text-xs"
          style={{ left: `${1 * 100}%` }}
        >
          +20
        </span>
      </div>
    </div>
  );
};
export default RangeSlider;
