import { sumReducer } from './utils';

describe('Utils', () => {
  describe('sumReducer', () => {
    it('works', () => {
      expect(sumReducer([])).toBe(0);
      expect(sumReducer([1, 2, 3])).toBe(6);
      expect(sumReducer([1, 1, 1])).toBe(3);
      expect(sumReducer([0, 2, -3])).toBe(-1);
      expect(sumReducer([null, 2, 4])).toBe(-6);
    });
  });
});
