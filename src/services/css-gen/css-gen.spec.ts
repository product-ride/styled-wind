import { CSSGen } from './css-gen';
import generateStylesJS from '../../utils/generateStylesJS';

describe('CSSGen', () => {
  let cssGen: CSSGen;

  beforeEach(() => {
    cssGen = new CSSGen(generateStylesJS({}));
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

  it('should generate css for classes like `mt-10`', () => {
    const css = cssGen.genCSS(['bg-red-500']);

    expect(css).toMatchSnapshot();
  });
});
