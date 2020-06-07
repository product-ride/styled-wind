import { warn, hydrateWithCSS } from './utils';
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

  describe('hydrateWithCSS()', () => {
    it('should replace classes with css styles', () => {
      const styled = `
      .bg-red;
      .text-color-green;
      border: 1px solid red;
      `;
      const styleSheet = {
        'bg-red': 'background: red',
        'text-color-green': 'color: green'
      };

      const css = hydrateWithCSS(styled, styleSheet);

      expect(css).toBe('background: red;color: green;border: 1px solid red;');
    });
  });
});
