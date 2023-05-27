import { Slider } from '@mui/base';
import { sliderClasses } from '@mui/base/Slider';
import { alpha, Box } from '@mui/system';
import styled from '@mui/system/styled';
import React from 'react';
import { Unit } from '../../utils/unitChange';

// import './FlatSlider.css';
interface IProps {
  defaultValueMin: number;
  defaultValueMax: number;
  marks: number[];
  unit: Unit;
}

const PreferenceSlider: React.FC = () => {
  const [value, setValue] = React.useState<number[]>([20, 37]);
  const [vars, setVars] = React.useState<React.CSSProperties>(defaultVars);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVars(event.target.checked ? successVars : defaultVars);
  };
  const handleChangeValue = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <>
      <Box sx={{ width: 300 }}>
        <StyledSliderBetter
          style={vars}
          getAriaLabel={() => 'Temperature range'}
          onChange={handleChangeValue}
          getAriaValueText={valuetext}
          value={value}
          step={null}
          marks={marks}
        />
      </Box>
    </>
  );
};
const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 60,
    label: '60',
  },
  {
    value: 70,
    label: '70',
  },
  {
    value: 80,
    label: '80',
  },
  {
    value: 90,
    label: '90',
  },
  {
    value: 100,
    label: '100',
  }
];

function valuetext(value: number) {
  return `${value}°C`;
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  300: '#66B2FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};
const colors = {
  green: '#4CBD17',
  orage: '#EF8A17',
};

const successVars = {
  '--color': '#4caf50',
  '--box-shadow': 'rgb(76, 175, 80, .16)',
} as React.CSSProperties;

const defaultVars = {
  '--color': '#1976d2',
  '--box-shadow': 'rgb(25, 118, 210, .16)',
} as React.CSSProperties;

const StyledSliderBetter = styled(Slider)(({ value }) =>
({
  color: colors.green,
  height: 6,
  width: '100%',
  padding: '16px 0',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  '-webkit-tap-highlight-color': 'transparent',
  ['&:hover']: {
    opacity: 1,
  },
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: grey[300],
    opacity: 0.5,
  },
  [`& .${sliderClasses.rail}`]: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: 4,
    borderRadius: 2,
    opacity: 0.4,
    backgroundColor: 'currentColor',
  },
  [`& .${sliderClasses.track}`]: {
    display: 'block',
    position: 'absolute',
    height: 4,
    borderRadius: 2,
    backgroundImage: `linear-gradient(to right, #EF8A17 0%, #4CBD17 ${60}%, #4CBD17 ${40}%, #EF8A17 100%)`,
  },
  [`& .${sliderClasses.thumb}`]: {
    position: 'absolute',
    width: 16,
    height: 16,
    marginLeft: -6,
    marginTop: -6,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 0,
    border: `3px solid currentColor`,
    backgroundColor: '#fff',
    [`&:hover, &.${sliderClasses.focusVisible}`]: {
      boxShadow: `0 0 0 0.25rem ${alpha(colors.green, 0.15)}`,
    },
    [`&.${sliderClasses.active}`]: {
      boxShadow: `0 0 0 0.25rem ${alpha(colors.green, 0.3)}`,
    },
  },
  [`& .${sliderClasses.mark}`]: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'currentColor',
    top: '50%',
    opacity: 0.7,
    transform: 'translateX(-50%)',
  },
  [`& .${sliderClasses.markActive}`]: {
    backgroundColor: '#fff',
  },
  [`& .${sliderClasses.markLabel}`]: {
    fontSize: 12,
    position: 'absolute',
    top: 20,
    transform: 'translateX(-50%)',
    marginTop: 8,
  },

}));

export default PreferenceSlider;
