import resolveConfig from './generateStylesJS';

const mockConfig = {
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif']
    },
    extend: {
      colors: {
        cyan: '#9cdbff'
      },
      margin: {
        '96': '24rem',
        '128': '32rem'
      }
    }
  }
};

describe('Config', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Resolve config - Default Config', () => {
    it('should match default config when custom config is empty', () => {
      const customConfig = resolveConfig({});
      expect(customConfig).toMatchSnapshot();
    });
  });

  describe('Resolve config - Custom Config', () => {
    it('should match default config when custom config is empty', () => {
      const customConfig = resolveConfig(mockConfig);
      expect(customConfig).toMatchSnapshot();
    });
  });
});
