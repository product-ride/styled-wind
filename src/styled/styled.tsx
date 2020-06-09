import { DOMElement, domElements } from '../utils/dom-elements';
import { hydrateWithCSS } from '../utils/utils';
import styled, { AnyStyledComponent } from 'styled-components';
import styles from '../styles.json';

type StyledFn = (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => string;

const getHydratedTemplateString = (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => {
  const hydratedStrings = strings.map((string) =>
    hydrateWithCSS(string, styles)
  );

  const hydratedTemplateString =
    hydratedStrings.length > 0
      ? hydratedStrings.reduce((prev, cur, index) => {
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
