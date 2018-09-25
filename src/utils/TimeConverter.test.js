import timeConverter from './TimeConverter';

describe('timeConverter', () => {
  it('should convert time', () => {
    expect(timeConverter('00:00')).toBe('12:00am');
    expect(timeConverter('01:00')).toBe('1:00am');
    expect(timeConverter('1:00')).toBe('1:00am');
    expect(timeConverter('11:59')).toBe('11:59am');
    expect(timeConverter('13:00')).toBe('1:00pm');
    expect(timeConverter('12:00')).toBe('12:00pm');
  });
});
