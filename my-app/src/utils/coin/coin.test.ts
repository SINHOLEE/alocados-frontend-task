import { isValidAmount } from './coin';

describe('coin', () => {
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
