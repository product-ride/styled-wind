import { CSSGen } from './css-gen';
import { defaultConfig } from '../../utils/defaultConfig';

describe('CSSGen', () => {
  let cssGen: CSSGen;

  beforeEach(() => {
    cssGen = new CSSGen(defaultConfig);
  });

  it('should generate css for classes like `clearfix`', () => {
    const css = cssGen.genCSS(['clearfix', 'antialiased']);

    expect(css).toMatchSnapshot();
  });

  it('should generate css for classes like `float-right`', () => {
    const css = cssGen.genCSS(['float-right', 'overflow-x-auto']);

    expect(css).toMatchSnapshot();
  });

  it('should generate css for classes like `mt-10`', () => {
    const css = cssGen.genCSS(['mt-5', 'm-0', 'pt-1', 'p-0']);

    expect(css).toMatchSnapshot();
  });
});
