import React, { useState } from 'react';

interface IProps {
  steps: number[];
  step: number;
  onChange: (value: number) => void;
  value: number;
}

const SliderNormal = ({step, steps, value, onChange }: IProps) => {
  const min = Math.min(...steps);
  const max = Math.max(...steps);
  const handleRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = +e.target.value;
    value = newValue;
    onChange(newValue);
  };

  const position = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-1/2">
      <div className="relative m-2 h-4 w-full items-center">
        <div className="absolute -mx-2 h-4 w-[calc(100%+1rem)]">
          <input
            className="input2 absolute z-3 h-full w-full appearance-none p-0 opacity-0"
            type="range"
            value={value}
            step={step}
            min={min}
            max={max}
            onChange={handleRightChange}
          />
        </div>
        <div className="absolute inline-block h-4 w-full">
          {/*Control*/}
          <div
            className="absolute top-1/2 z-2 -ml-2 h-4 w-4 -translate-y-1/2 rounded-full bg-pb-green"
            style={{ left: `${position}%` }}
          ></div>
          {/*Track*/}
          <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-r-md bg-gray-300">
            {/*Rail*/}
            <div
              className="absolute h-full bg-pb-orange"
              style={{ left: `0%`, right: `${100 - position}%` }}
            />
          </div>
        </div>
      </div>
      {steps.map((step, index) => (
        <span
          key={index}
          className="absolute top-3 mt-4 w-4 text-center text-xs"
          style={{ left: `${100 - (index / (steps.length - 1)) * 100}%` }}
        >
          {steps[steps.length - 1 - index]!}
        </span>
      ))}
    </div>
  );
};

export default SliderNormal;
