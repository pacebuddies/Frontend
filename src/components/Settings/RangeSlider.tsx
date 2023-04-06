import React, { useEffect, useState } from "react";

interface IProps {
  step: number;
  min: number;
  max: number;
  value?: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}

const RangeSlider = ({ min, max, value, step, onChange }: IProps) => {
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


  return (
    <div className="relative flex items-center p-t-6 h-[calc(16px+1.6rem)]">
      <div className="w-[calc(100%+16px)] -mx-2 absolute h-4">
        <input
          className="absolute w-full h-full z-1 p-0 appearance-none"
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className="absolute w-full h-full z-1 p-0 appearance-none"
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className="w-full absolute h-4 pointer-events-none">
        <div className="w-4 h-4 rounded-full absolute bg-pb-green top-1/2 -ml-2 transform -translate-y-1/2 z-2 " style={{ left: `${minPos}%` }} />
        <div className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 rounded bg-gray-400">
          <div
            className="absolute h-full bg-pb-green opacity-50"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className="w-4 h-4 rounded-full absolute bg-pb-green top-1/2 -ml-2 transform -translate-y-1/2 z-2 " style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
};


export default RangeSlider;
