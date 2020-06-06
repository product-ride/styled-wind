import { DEFAULT_THEME } from '../theme/default';
import { warn, getColor } from './utils';
import { name } from '../../package.json';

describe('Utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('warn()', () => {
    it('should print the warning message in correct format', () => {
      const message = 'some random warning';
      const expectedMessage = `${name}: warning: ${message}`;
      console.warn = jest.fn();

      warn(message);

      expect(console.warn).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe('getColor()', () => {
    it('should return the color hex value from theme', () => {
      const red900Hex = DEFAULT_THEME.colors.red['900'];

      const colorHex = getColor(DEFAULT_THEME, 'red-900');

      expect(colorHex).toBe(red900Hex);
    });
  });
});
