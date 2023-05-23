import { useState } from 'react';
import NumberGrow from '../NumberGrow';
import SliderNormal from './SliderNormal';
import SliderReversed from './SliderReversed';

interface IProps {
  step: number;
  minBracketValue: number;
  maxBracketValue: number;
  minSteps: number[];
  maxSteps: number[];
  minStep: number;
  maxStep: number;
  value: { min: number; max: number };
  onChange: (values: { min: number; max: number }) => void;
}

const DoubleSlider = ({
  minBracketValue,
  maxBracketValue,
  minSteps,
  maxSteps,
  minStep,
  maxStep,
  value,
  onChange,
}: IProps) => {
  const [values, setValues] = useState(value);
  // const [left, right] = values;

  const handleLeftSliderChange = (value: number) => {
    setValues({ ...values, min: value });
    onChange({ ...values, min: value });
  };
  const handleRightSliderChange = (value: number) => {
    setValues({ ...values, max: value });
    onChange({ ...values, max: value });
  };

  const calculateMinBracketValue = (value: number) => {
    const bracketValue = minBracketValue + value;
    if (bracketValue < 0) return 0;
    else return minBracketValue + value;
  };
  const calculateMaxBracketValue = (value: number) => {
    return maxBracketValue + value;
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-[calc(100%-1rem)]">
        <SliderReversed
          steps={minSteps}
          step={minStep}
          value={values.min}
          onChange={handleLeftSliderChange}
        />
        <div className="relative left-2 top-3 h-2 w-8 bg-pb-green"></div>
        <SliderNormal
          steps={maxSteps}
          step={maxStep}
          value={values.max}
          onChange={handleRightSliderChange}
        />
      </div>
      <div className="mx-auto mt-3">
        <NumberGrow
          springConfig={{ mass: 1, tension: 60, friction: 20 }}
          num={calculateMinBracketValue(values.min)}
          className={`font-bold ${
            values.min == 0 ? 'text-pb-green' : 'text-pb-orange'
          }`}
        >
          &nbsp;km
        </NumberGrow>
        <span> - </span>
        <NumberGrow
          springConfig={{ mass: 1, tension: 60, friction: 20 }}
          num={calculateMaxBracketValue(values.max)}
          className={`font-bold ${
            values.max == 0 ? 'text-pb-green' : 'text-pb-orange'
          }`}
        >
          &nbsp;km
        </NumberGrow>
      </div>
    </div>
  );
};

export default DoubleSlider;
