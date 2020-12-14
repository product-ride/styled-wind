import { CSSGen } from '../services/css-gen/css-gen';
import generateStylesJS from './generateStylesJS';

const windowObj: any = window;
const customConfig = windowObj?.__STYLED_WIND_CUSTOM_CONFIG__ || {};

const config = generateStylesJS(customConfig);
const cssGen = new CSSGen(config);

export const getHydratedTemplateString = (
  strings: TemplateStringsArray
): any => {
  const sanitizedStyles = strings.map((stringsPart) => {
    /*
        Convert tailwind classes to their CSS equivalent and pass the result 
        to styled tag from styled-components.
        
        Fixes: https://github.com/product-ride/styled-wind/issues/16
        Ref: https://github.com/product-ride/styled-wind/pull/21
    */
    return stringsPart
      .split(';')
      .map((style) => {
        if (style.trim().startsWith('.') || style.trim().startsWith('swind')) {
          return cssGen.genCSS(style.trim()).trim().replace(';', '');
        }
        return style;
      })
      .join(';');
  });

  return sanitizedStyles;
};
