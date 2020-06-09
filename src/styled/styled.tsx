import { DOMElement, domElements } from '../utils/dom-elements';
import styled, { AnyStyledComponent } from 'styled-components';
import { CSSGen } from '../services/css-gen/css-gen';
import generateStylesJS from '../utils/generateStylesJS';

type StyledFn = (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => string;

const config = generateStylesJS({});
const cssGen = new CSSGen(config);

const getHydratedTemplateString = (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => {
  const hydratedStrings = cssGen.genCSS(
    strings.map((string) => {
      if (string && string.trim().startsWith('.')) {
        return string.trim().substr(1);
      }
      return string.trim();
    })
  );
  console.log(hydratedStrings);

  const hydratedTemplateString =
    hydratedStrings.length > 0
      ? hydratedStrings.reduce((prev: string, cur: string, index: number) => {
          return `${prev}${cur}${expressions[index] || ''}`;
        }, '')
      : hydratedStrings[0];

  return hydratedTemplateString;
};

const genStyledFn = (el: string): StyledFn => (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => {
  const hydratedTemplateString = getHydratedTemplateString(
    strings,
    ...expressions
  );

  return styled[el]`
    ${hydratedTemplateString}
  `;
};

const styledWrapper:
  | Record<DOMElement, string>
  | ((tag: AnyStyledComponent) => any) = (tag: AnyStyledComponent) => (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => {
  const hydratedTemplateString = getHydratedTemplateString(
    strings,
    ...expressions
  );

  return styled(tag)`
    ${hydratedTemplateString}
  `;
};

domElements.forEach((domElement) => {
  styledWrapper[domElement] = genStyledFn(domElement);
});

export default styledWrapper;
