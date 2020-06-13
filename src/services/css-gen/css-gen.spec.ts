import { CSSGen } from './css-gen';
import generateStylesJS from '../../utils/generateStylesJS';

describe('CSSGen', () => {
  let cssGen: CSSGen;

  beforeEach(() => {
    cssGen = new CSSGen(generateStylesJS({}));
  });

  it('should generate css for classes like `clearfix`', () => {
    const css = cssGen.genCSS(['.clearfix', '.antialiased']);

    expect(css).toMatchInlineSnapshot(
      `"content: \\"\\";               display: table;               clear: both;-webkit-font-smoothing: antialiased;                  -moz-osx-font-smoothing: grayscale;"`
    );
  });

  it('should generate css for classes like `float-right, overflow-x-auto`', () => {
    const css = cssGen.genCSS(['.float-right', '.overflow-x-auto']);

    expect(css).toMatchInlineSnapshot(`"float: right;overflow-x: auto;"`);
  });

  it('should generate css for classes like `mt-10`', () => {
    const css = cssGen.genCSS(['.mt-5', '.m-0', '.pt-1', '.p-0']);

    expect(css).toMatchInlineSnapshot(
      `"margin-top: 1.25rem;margin: 0;padding-top: 0.25rem;padding: 0;"`
    );
  });

  it('should generate css for classes like `bg-red-500`', () => {
    const css = cssGen.genCSS(['.bg-red-500']);

    expect(css).toMatchInlineSnapshot(`"background: #f56565;"`);
  });

  it('should generate css for scale border-width', () => {
    const css = cssGen.genCSS(['.border-0', '.border-t-5']);

    expect(css).toMatchInlineSnapshot(
      `"border-width: 0px;border-top-width: 5px;"`
    );
  });

  it('should generate css for text-color', () => {
    const css = cssGen.genCSS(['.text-black', '.text-red-500']);

    expect(css).toMatchInlineSnapshot(`"color: #000;color: #f56565;"`);
  });

  it('should generate css for placeholder', () => {
    const css = cssGen.genCSS(['.placeholder-black', '.placeholder-red-500']);

    expect(css).toMatchInlineSnapshot(
      `"::placeholder {          color: #000;          }::placeholder {          color: #f56565;          }"`
    );
  });

  it('should generate css for stroke', () => {
    const css = cssGen.genCSS(['.stroke-1']);

    expect(css).toMatchInlineSnapshot(`"stroke-width: 1;"`);
  });

  it('should generate css for text size', () => {
    const css = cssGen.genCSS(['.text-6xl']);

    expect(css).toMatchInlineSnapshot(`"font-size: 4rem;"`);
  });

  it('should generate css for text weight', () => {
    const css = cssGen.genCSS(['.font-bold']);

    expect(css).toMatchInlineSnapshot(`"font-weight: 700;"`);
  });

  it('should generate css for letter spacing', () => {
    const css = cssGen.genCSS(['.tracking-wider']);

    expect(css).toMatchInlineSnapshot(`"letter-spacing: 0.05em;"`);
  });

  it('should generate css for line height', () => {
    const css = cssGen.genCSS(['.leading-5']);

    expect(css).toMatchInlineSnapshot(`"line-height: 1.25rem;"`);
  });

  it('should generate css for opacity', () => {
    const css = cssGen.genCSS(['.opacity-25']);

    expect(css).toMatchInlineSnapshot(`"opacity: 0.25;"`);
  });

  it('should generate css for placeholder opacity', () => {
    const css = cssGen.genCSS(['.placeholder-opacity-25']);

    expect(css).toMatchInlineSnapshot(
      `"::placeholder {        opacity: 0.25;        }"`
    );
  });

  it('should generate css for border opacity', () => {
    const css = cssGen.genCSS(['.border-opacity-25']);

    expect(css).toMatchInlineSnapshot(`"--border-opacity: 0.25"`);
  });

  it('should generate css for max width', () => {
    const css = cssGen.genCSS(['.max-w-6xl']);

    expect(css).toMatchInlineSnapshot(`"max-width: 72rem;"`);
  });

  it('should generate css for width', () => {
    const css = cssGen.genCSS(['.w-10/12']);

    expect(css).toMatchInlineSnapshot(`"width: 83.333333%;"`);
  });

  it('should generate css for height', () => {
    const css = cssGen.genCSS(['.h-10/12']);

    expect(css).toMatchInlineSnapshot(`"height: 83.333333%;"`);
  });

  it('should generate css for grid-template-cols', () => {
    const css = cssGen.genCSS(['.grid-cols-8', '.grid-cols-none']);

    expect(css).toMatchInlineSnapshot(
      `"grid-template-columns: repeat(8, minmax(0, 1fr));grid-template-columns: none;"`
    );
  });

  it('should generate css for grid-template-rows', () => {
    const css = cssGen.genCSS(['.grid-rows-8', '.grid-rows-none']);

    expect(css).toMatchInlineSnapshot(
      `"grid-template-rows: repeat(8, minmax(0, 1fr));grid-template-rows: none;"`
    );
  });

  it('should generate css for grid-row', () => {
    const css = cssGen.genCSS([
      '.row-auto',
      '.row-span-8',
      '.row-start-2',
      '.row-end-5'
    ]);

    expect(css).toMatchInlineSnapshot(
      `"grid-row: auto;grid-row: span 8 / span 8;grid-row-start: 2;grid-row-end: 5;"`
    );
  });

  it('should generate css for grid-row', () => {
    const css = cssGen.genCSS([
      '.col-auto',
      '.col-span-8',
      '.col-start-2',
      '.col-end-5'
    ]);

    expect(css).toMatchInlineSnapshot(
      `"grid-col: auto;grid-col: span 8 / span 8;grid-col-start: 2;grid-col-end: 5;"`
    );
  });

  it('should generate css for grid-gap', () => {
    const css = cssGen.genCSS(['.gap-16']);

    expect(css).toMatchInlineSnapshot(`"gap: 4rem;"`);
  });

  it('should generate css for grid-row-gap', () => {
    const css = cssGen.genCSS(['.row-gap-10']);

    expect(css).toMatchInlineSnapshot(`"row-gap: 2.5rem;"`);
  });

  it('should generate css for grid-col-gap', () => {
    const css = cssGen.genCSS(['.col-gap-10']);

    expect(css).toMatchInlineSnapshot(`"col-gap: 2.5rem;"`);
  });

  it('should generate css for border-radius without direction', () => {
    const css = cssGen.genCSS([
      '.rounded',
      '.rounded-none',
      '.rounded-md',
      '.rounded-lg',
      '.rounded-full'
    ]);

    expect(css).toMatchInlineSnapshot(
      `"border-radius: 0.25rem;border-radius: 0;border-radius: 0.375rem;border-radius: 0.5rem;border-radius: 9999px;"`
    );
  });

  it('should generate css for border-radius with direction', () => {
    const css = cssGen.genCSS([
      '.rounded-t',
      '.rounded-tl-md',
      '.rounded-br-none'
    ]);

    expect(css).toMatchInlineSnapshot(
      `"border-top-left-radius: 0.25rem;                  border-top-right-radius: 0.25rem;                                    border-top-left-radius: 0.375rem;                                  border-bottom-right-radius: 0;"`
    );
  });

  it('should generate css for hover', () => {
    const css = cssGen.genCSS(['.hover:text-black']);

    expect(css).toMatchInlineSnapshot(
      `"&:hover {        color: #000;        }"`
    );
  });

  it('should generate css active classes', () => {
    const css = cssGen.genCSS(['.active:text-black']);

    expect(css).toMatchInlineSnapshot(
      `"&:active {        color: #000;        }"`
    );
  });

  it('should generate breakpoint css', () => {
    const css = cssGen.genCSS(['.sm:text-black']);

    expect(css).toMatchInlineSnapshot(
      `"@media (min-width: 640px) {        color: #000;        }"`
    );
  });

  it('should generate css when argument is not an array', () => {
    const css = cssGen.genCSS('.sm:bg-red-900');

    expect(css).toMatchInlineSnapshot(
      `"@media (min-width: 640px) {        background: #742a2a;        }"`
    );
  });

  it('should support swind API', () => {
    const css = cssGen.genCSS('swind : text-red-900');

    expect(css).toMatchInlineSnapshot(`"color: #742a2a;"`);
  });

  it('should support swind-hover API', () => {
    const css = cssGen.genCSS('swind-hover : text-red-900');

    expect(css).toMatchInlineSnapshot(
      `"&:hover {        color: #742a2a;        }"`
    );
  });
});
