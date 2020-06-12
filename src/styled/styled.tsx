import { DOMElement, domElements } from '../utils/dom-elements';
import styled, { AnyStyledComponent } from 'styled-components';
import { CSSGen } from '../services/css-gen/css-gen';
import generateStylesJS from '../utils/generateStylesJS';

type StyledFn = (
  strings: TemplateStringsArray,
  ...expressions: string[]
) => string;

const windowObj: any = window;
const customConfig = windowObj?.__STYLED_WIND_CUSTOM_CONFIG__ || {};

const config = generateStylesJS(customConfig);
const cssGen = new CSSGen(config);

const getHydratedTemplateString = (strings: TemplateStringsArray) => {
  const sanitizedStyles = strings.map((stringsPart) => {
    const classes = stringsPart.split(';');
    /*
      This is to handle the following case

      margin-top: ${(props: any) => props.margin};
     .text-yellow-900;

     if we don't do this then we might miss the ; from `margin-top` style
     and style wind style will be applied in the same line leading to

     margin-top: 20pxcolor:#fff;
    */
    if (classes[0].length === 0) {
      return [';', ...classes];
    } else {
      return classes;
    }
  });

  return sanitizedStyles.map((sanitizedStyle) => {
    return sanitizedStyle.map((style) => {
      if (style.trim().startsWith('.')) {
        return cssGen.genCSS([style.trim().substr(1)]).trim();
      } else {
        return style;
      }
    });
  }) as any;
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
