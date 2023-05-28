import { useState } from 'react';
import NumberGrow from '../NumberGrow';
import SliderNormal from './SliderNormal';
import SliderReversed from './SliderReversed';
import { UnitPreference } from "../../internalTypes/interfaces";
import { Unit, unitChange } from "../../utils/unitChange";

interface IProps {
  minBracketValue: number;
  maxBracketValue: number;
  minSteps: number[];
  maxSteps: number[];
  minStep: number;
  maxStep: number;
  value: { min: number; max: number };
  onChange: (values: { min: number; max: number }) => void;
  unitFrom: Unit;
  unitTo: Unit;
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
  unitFrom,
  unitTo,
}: IProps) => {
  // const [values, setValues] = useState(value);
  // const [left, right] = values;

  const handleLeftSliderChange = (newValue: number) => {
    const updatedValues = { ...value, min: newValue };
    onChange(updatedValues);
  };
  const handleRightSliderChange = (newValue: number) => {
    const updatedValues = { ...value, max: newValue };
    onChange(updatedValues);
  };


  const calculateMinBracketValue = (value: number) => {
    const bracketValue = minBracketValue + value;
    if (bracketValue < 0) return 0;
    else return minBracketValue + value;
  };
  const calculateMaxBracketValue = (value: number) => {
    console.log(maxBracketValue + value);
    return maxBracketValue + value;
  };


  return (
    <div className="flex w-full flex-col">
      <div className="flex w-[calc(100%-1rem)]">
        <SliderReversed
          steps={minSteps}
          step={minStep}
          value={value.min}
          onChange={handleLeftSliderChange}
        />
        <div className="relative left-2 top-3 h-2 w-8 bg-pb-green"></div>
        <SliderNormal
          steps={maxSteps}
          step={maxStep}
          value={value.max}
          onChange={handleRightSliderChange}
        />
      </div>
      <div className="mx-auto mt-3">
        <NumberGrow
          springConfig={{ mass: 0.1, tension: 240, friction: 20 }}
          num={unitChange(calculateMinBracketValue(value.min), unitFrom, unitTo)}
          className={`font-bold ${
            value.min == 0 ? 'text-pb-green' : 'text-pb-orange'
          }`}
        >
          &nbsp;{unitTo}
        </NumberGrow>
        <span className="font-bold text-pb-green"> - </span>
        <NumberGrow
          springConfig={{ mass: 0.1, tension: 240, friction: 20 }}
          num={unitChange(calculateMaxBracketValue(value.max), unitFrom, unitTo)}
          className={`font-bold ${
            value.max == 0 ? 'text-pb-green' : 'text-pb-orange'
          }`}
        >
          &nbsp;{unitTo}
        </NumberGrow>
      </div>
    </div>
  );
};

export default DoubleSlider;
