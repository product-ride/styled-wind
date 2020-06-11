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

const getHydratedTemplateString = (strings: TemplateStringsArray) => {
  const sanitizedStyles = strings.map((stringsPart) => {
    return stringsPart.split(';').map((string) => {
      if (string && string.trim().startsWith('.')) {
        return string.trim().substr(1);
      }
      return string.trim();
    });
  });

  return sanitizedStyles.map((sanitizedStyle) =>
    cssGen.genCSS(sanitizedStyle)
  ) as any;
};

const genStyledFn = (el: string): StyledFn => (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => {
  const hydratedTemplateString = getHydratedTemplateString(strings);

  return styled[el](hydratedTemplateString, ...expressions);
};

const styledWrapper:
  | Record<DOMElement, string>
  | ((tag: AnyStyledComponent) => any) = (tag: AnyStyledComponent) => (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => {
  const hydratedTemplateString = getHydratedTemplateString(strings);

  return styled(tag)(hydratedTemplateString, ...expressions);
};

domElements.forEach((domElement) => {
  styledWrapper[domElement] = genStyledFn(domElement);
});

export default styledWrapper;
