import { DOMElement, domElements } from '../utils/dom-elements';
import styled, { AnyStyledComponent } from 'styled-components';
import { CSSGen } from '../services/css-gen/css-gen';
import generateStylesJS from '../utils/generateStylesJS';

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
        return cssGen.genCSS(style.trim()).trim();
      } else {
        return style;
      }
    });
  }) as any;
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
  const proxyMethod = (target: any, handler: ProxyHandler<any>) => {
    return new Proxy(target, {
      apply(attrTarget, thisArgs, args) {
        const attrsFn = attrTarget.apply(thisArgs, args);

        return new Proxy(attrsFn, handler);
      }
    });
  };

  styledWrapper[domElement] = new Proxy(styled[domElement], {
    apply(target: any, thisArg: any, args: any[]): any {
      const [strings, expressions] = args;
      const hydratedTemplateString = getHydratedTemplateString(strings);

      return target.apply(thisArg, [hydratedTemplateString, expressions]);
    },
    get(target: any, attr: string) {
      if (attr === 'attrs') {
        return proxyMethod(target.attrs, {
          apply: (attrsFnTarget: any, thisArg, args) => {
            const [strings, expressions] = args;
            const hydratedTemplateString = getHydratedTemplateString(strings);

            return attrsFnTarget.apply(thisArg, [
              hydratedTemplateString,
              expressions
            ]);
          }
        });
      } else if (attr === 'withConfig') {
        return proxyMethod(target.withConfig, {
          get(target: any, attr: string): any {
            if (attr === 'attrs') {
              return proxyMethod(target.attrs, {
                apply(target: any, thisArg: any, args: any[]): any {
                  const [strings, expressions] = args;
                  const hydratedTemplateString = getHydratedTemplateString(
                    strings
                  );

                  return target.apply(thisArg, [
                    hydratedTemplateString,
                    expressions
                  ]);
                }
              });
            } else {
              return target[attr];
            }
          }
        });
      }

      return target[attr];
    }
  });
});

export default styledWrapper;
