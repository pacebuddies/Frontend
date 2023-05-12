type DistanceUnit = 'm' | 'km' | 'mile' | 'feet';
type SpeedUnit = 'm/s' | 'km/h' | 'mile/h';
type PaceUnit = 'min/km' | 'min/mile' | 's/m';


export type Unit = DistanceUnit | SpeedUnit | PaceUnit;

const converter = {
  from: {
    m: {
      m: (val: number) => val,
      km: (val: number) => val / 1000,
      mile: (val: number) => val / 1609.344,
      feet: (val: number) => val * 3.28084,
    },
    km: {
      m: (val: number) => val * 1000,
      km: (val: number) => val,
      mile: (val: number) => val / 1.609344,
      feet: (val: number) => val * 3280.84,
    },
    mile: {
      m: (val: number) => val * 1609.344,
      km: (val: number) => val * 1.609344,
      mile: (val: number) => val,
      feet: (val: number) => val * 5280,
    },
    feet: {
      m: (val: number) => val / 3.28084,
      km: (val: number) => val / 3280.84,
      mile: (val: number) => val / 5280,
      feet: (val: number) => val,
    },
    'm/s': {
      'm/s': (val: number) => val,
      'km/h': (val: number) => val * 3.6,
      'mile/h': (val: number) => val * 2.236936,
    },
    'km/h': {
      'm/s': (val: number) => val / 3.6,
      'km/h': (val: number) => val,
      'mile/h': (val: number) => val / 1.609344,
    },
    'mile/h': {
      'm/s': (val: number) => val / 2.236936,
      'km/h': (val: number) => val * 1.609344,
      'mile/h': (val: number) => val,
    },
    'min/km': {
      'min/mile': (val: number) => val * 1.609344,
      'min/km': (val: number) => val,
      's/m': (val: number) => val * 60 / 1000,
    },
    'min/mile': {
      'min/km': (val: number) => val / 1.609344,
      's/m': (val: number) => val * 60 / 1609.344,
      'min/mile': (val: number) => val,
    },
    's/m': {
      's/m': (val: number) => val,
      'min/km': (val: number) => val * 1000 / 60,
      'min/mile': (val: number) => val * 1609.344 / 60,
    },
  },
};


function getConverterFunction(
  fromUnit: Unit,
  toUnit: Unit,
): ((val: number) => number) | null {
  if (
    Object.prototype.hasOwnProperty.call(converter.from, fromUnit) &&
    Object.prototype.hasOwnProperty.call(
      converter.from[fromUnit as keyof typeof converter.from],
      toUnit,
    )
  ) {
    return converter.from[fromUnit as keyof typeof converter.from][
      toUnit as keyof (typeof converter.from)[Unit]
    ];
  }
  return null;
}

export function unitChange(
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
): number {
  const converterFunction = getConverterFunction(fromUnit, toUnit);
  if (converterFunction) {
    return converterFunction(value);
  } else {
    throw new Error(
      `Conversion from ${fromUnit} to ${toUnit} is not supported.`,
    );
  }
}
