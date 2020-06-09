import { warn } from './utils';
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
});
