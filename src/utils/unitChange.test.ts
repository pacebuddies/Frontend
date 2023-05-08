import { unitChange } from './unitChange';

describe('unitChange', () => {
  it('should convert meters to kilometers', () => {
    const result = unitChange(1000, 'm', 'km');
    expect(result).toBeCloseTo(1);
  });

  it('should convert meters to feet', () => {
    const result = unitChange(1000, 'm', 'feet');
    expect(result).toBeCloseTo(3280.8399);
  });

  it('should convert kilometers to miles', () => {
    const result = unitChange(1, 'km', 'mile');
    expect(result).toBeCloseTo(0.621371);
  });

  it('should convert m/s to km/h', () => {
    const result = unitChange(1, 'm/s', 'km/h');
    expect(result).toBeCloseTo(3.6);
  });

  it('should convert min/km to min/mile', () => {
    const result = unitChange(1, 'min/km', 'min/mile');
    expect(result).toBeCloseTo(1.609344);
  });

  it('should convert s/m to min/km', () => {
    const result = unitChange(1, 's/m', 'min/km');
    expect(result).toBeCloseTo(16.666667);
  });

  it('should throw an error for unsupported conversion', () => {
    expect(() => unitChange(1, 'm', 'm/s')).toThrow(
      'Conversion from m to m/s is not supported.',
    );
  });
});
