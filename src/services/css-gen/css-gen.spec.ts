import { CSSGen } from './css-gen';
import generateStylesJS from '../../utils/generateStylesJS';

describe('CSSGen', () => {
  let cssGen: CSSGen;

  beforeEach(() => {
    cssGen = new CSSGen(generateStylesJS({}));
  });

  it('should generate css for classes like `clearfix`', () => {
    const css = cssGen.genCSS(['clearfix', 'antialiased']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "content: \\"\\";
                     display: table;
                     clear: both;",
        "-webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;",
      ]
    `);
  });

  it('should generate css for classes like `float-right`', () => {
    const css = cssGen.genCSS(['float-right', 'overflow-x-auto']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "float: right;",
        "overflow-x: auto;",
      ]
    `);
  });

  it('should generate css for classes like `mt-10`', () => {
    const css = cssGen.genCSS(['mt-5', 'm-0', 'pt-1', 'p-0']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "margin-top: 1.25rem;",
        "margin: 0;",
        "padding-top: 0.25rem;",
        "padding: 0;",
      ]
    `);
  });

  it('should generate css for classes like `mt-10`', () => {
    const css = cssGen.genCSS(['bg-red-500']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "background: #f56565;",
      ]
    `);
  });

  it('should generate css for scale border-width', () => {
    const css = cssGen.genCSS(['border-0', 'border-t-5']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "border-width: 0px;",
        "border-top-width: 5px;",
      ]
    `);
  });

  it('should generate css for text-color', () => {
    const css = cssGen.genCSS(['text-black', 'text-red-500']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "color: #000;",
        "color: #f56565;",
      ]
    `);
  });

  it('should generate css for placeholder', () => {
    const css = cssGen.genCSS(['placeholder-black', 'placeholder-red-500']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "color: #000;",
        "color: #f56565;",
      ]
    `);
  });

  it('should generate css for stroke', () => {
    const css = cssGen.genCSS(['stroke-1']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "stroke-width: 1;",
      ]
    `);
  });

  it('should generate css for text size', () => {
    const css = cssGen.genCSS(['text-6xl']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "font-size: 4rem;",
      ]
    `);
  });

  it('should generate css for text weight', () => {
    const css = cssGen.genCSS(['font-bold']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "font-weight: 700;",
      ]
    `);
  });

  it('should generate css for letter spacing', () => {
    const css = cssGen.genCSS(['tracking-wider']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "letter-spacing: 0.05em;",
      ]
    `);
  });

  it('should generate css for line height', () => {
    const css = cssGen.genCSS(['leading-5']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "line-height: 1.25rem;",
      ]
    `);
  });

  it('should generate css for opacity', () => {
    const css = cssGen.genCSS(['opacity-25']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "opacity: 0.25;",
      ]
    `);
  });

  it('should generate css for placeholder opacity', () => {
    const css = cssGen.genCSS(['placeholder-opacity-25']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "--placeholder-opacity: 0.25;",
      ]
    `);
  });

  it('should generate css for border opacity', () => {
    const css = cssGen.genCSS(['border-opacity-25']);

    expect(css).toMatchInlineSnapshot(`
      Array [
        "--border-opacity: 0.25",
      ]
    `);
  });
});
