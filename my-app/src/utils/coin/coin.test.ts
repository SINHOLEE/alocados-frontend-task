import { calcAmount, formatAmount, isValidAmount } from './coin';

describe('coin', () => {
  describe('calcAmount', () => {
    it('should return correct answer1 for add', () => {
      expect(calcAmount('+')('100000000', '99999999')).toBe(
        '199999999.0000000000',
      );
    });
    it('should return correct answer2 for add', () => {
      expect(calcAmount('+')('0.1234567890', '10.0000000001')).toBe(
        '10.1234567891',
      );
    });
    it('should return correct answer1 for subtraction', () => {
      expect(calcAmount('-')('100000000', '99999999')).toBe('1.0000000000');
    });
    it('should return correct answer2 for subtraction', () => {
      expect(calcAmount('-')('10.1234567890', '0.0000000001')).toBe(
        '10.1234567889',
      );
    });
    it('should return correct answer3 for subtraction', () => {
      expect(calcAmount('-')('10.1234567890', '0.0000000001')).toBe(
        '10.1234567889',
      );
    });
  });
  describe('formatAmount', () => {
    it('should return 3comma format', () => {
      expect(formatAmount('1234567')).toBe('1,234,567');
    });
    it('should return as toFix(2) more then 2', () => {
      expect(formatAmount('1234567.123456')).toBe('1,234,567.12');
    });

    it('should return no fractionalPart when .00', () => {
      expect(formatAmount('1234567.00')).toBe('1,234,567');
    });
    it('should return 1 fractionalPart when .[d]0', () => {
      expect(formatAmount('1234567.30')).toBe('1,234,567.3');
    });
  });
  describe('isValidAmount ', () => {
    it('all inputs are valid', () => {
      ['', '0', '0.', '1.0', '11.01', '11.1111111111'].forEach((input) =>
        expect(isValidAmount(input)).toBeTruthy(),
      );
    });
    it('all inputs are not valid', () => {
      ['a', '0.1.1', '1.00000000000'].forEach((input) =>
        expect(isValidAmount(input)).toBeFalsy(),
      );
    });
  });
});
