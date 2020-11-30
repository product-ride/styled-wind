import { getHydratedTemplateString } from './getHydratedTemplateString';

const getStringTemplate = (...args: any) => {
  return args[0];
};

const removeLineBreaks = (styles: string[]) => {
  return styles.map((style: string) =>
    style.split('\n').join('').replace(/ /g, '')
  );
};

const hasDifferentStyles = (
  generatedStyles: string[],
  expectedStyles: string[]
) => {
  const parsedGeneratedStyles = removeLineBreaks(generatedStyles);
  const parsedExpectedStyles = removeLineBreaks(expectedStyles);

  const hasDifferentStyle = parsedGeneratedStyles.filter(
    (style: string, index: number) =>
      style.trim() !== parsedExpectedStyles[index].trim()
  );

  return Boolean(hasDifferentStyle.length);
};

/**
 * Test the core logic of converting Tailwind classes to their
 * respective style equivalent.
 *
 * Testing done for the first argument of taged template literal
 * which require transformation and is than sent over to styled tag
 * from styled-components.
 */
describe('Tailwind Classes Hydration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate correct styles for tailwind classes', () => {
    const generatedStyles = getHydratedTemplateString`
        .p-2;
        .mt-2;
      `;

    const expectedStyles = getStringTemplate`
        padding: 0.5rem;
        margin-top: 0.5rem;
      `;
    expect(hasDifferentStyles(generatedStyles, expectedStyles)).toBeFalsy();
  });

  it('should generate correct styles for tailwind classes and custom styles', () => {
    const generatedStyles = getHydratedTemplateString`
        .pt-2;
        color: red;
        .mt-2;
        font-size: 10px;
      `;

    const expectedStyles = getStringTemplate`
        padding-top: 0.5rem;
        color: red;
        margin-top: 0.5rem;
        font-size: 10px;
      `;

    expect(hasDifferentStyles(generatedStyles, expectedStyles)).toBeFalsy();
  });

  it('should generate correct styles for pseudo classes', () => {
    const generatedStyles = getHydratedTemplateString`
        .pt-2;
        swind-hover: p-4;
      `;

    const expectedStyles = getStringTemplate`
        padding-top: 0.5rem;
        &:hover {
          padding: 1rem
        };
      `;

    expect(hasDifferentStyles(generatedStyles, expectedStyles)).toBeFalsy();
  });

  it('should generate correct styles with dynamic accessor', () => {
    const generatedStyles = getHydratedTemplateString`
        .pt-2;
        swind-hover: p-4;
        color: ${() => 'red'};
        border: ${() => '1px solid black'};
      `;

    const expectedStyles = getStringTemplate`
        padding-top: 0.5rem;
        &:hover {
          padding: 1rem
        };
        color: ${() => 'red'};
        border: ${() => '1px solid black'};
      `;
    expect(hasDifferentStyles(generatedStyles, expectedStyles)).toBeFalsy();
  });
});
