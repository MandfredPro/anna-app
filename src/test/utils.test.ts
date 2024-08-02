import { formatNumber } from '../utils/formatters'; 

describe('formatNumber', () => {
  it('should format numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });
});
