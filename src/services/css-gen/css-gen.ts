import last from 'lodash/last';

export class CSSGen {
  // stores the theme config object
  private config: any;
  // classes which need no regex matching
  private staticClasses = {
    clearfix: `content: "";
               display: table;
               clear: both;`,
    // font smoothing
    antialiased: `-webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;`,
    'subpixel-antialiased': `-webkit-font-smoothing: auto;
                             -moz-osx-font-smoothing: auto;`,
    'break-normal': `overflow-wrap: normal;
                      word-break: normal;`,
    'break-words': `overflow-wrap: break-word;`,
    'break-all': `word-break: break-all;`,
    truncate: `overflow: hidden;
                 text-overflow: ellipsis;
                 white-space: nowrap;`,
    'box-border': 'box-sizing: border-box;',
    'box-content': 'box-sizing: content-box;',
    hidden: 'display: hidden;',
    block: 'diplay: block;',
    inline: 'display: inline;',
    'inline-block': 'display: inline-block;',
    flex: 'display: flex;',
    'inline-flex': 'display: inline-flex',
    table: 'display: table-cell;',
    'table-column': 'display: table-column;',
    'table-column-group': 'display: table-column-group;',
    'table-footer-group': 'display: table-footer-group;',
    'table-header-group': 'display: table-header-group;',
    'table-row-group': 'display: table-row-group;',
    'table-row': 'display: table-row;',
    'flow-root': 'display: flow-root;',
    grid: 'display: grid;',
    static: 'position: static;',
    fixed: 'position: fixed;',
    absolute: 'position: absolute;',
    relative: 'position: relative;',
    sticky: 'position: sticky;',
    visible: 'visibility: visible;',
    invisible: 'visibility: invisible;',
    italic: 'font-style: italic;',
    'non-italic': 'font-style: normal;',
    underline: 'text-decoration: underline;',
    'line-through': 'text-decoration: line-through;',
    'no-underline': 'text-decoration: none;',
    uppercase: 'text-transform: uppercase;',
    lowercase: 'text-transform: lowercase;',
    capitalize: 'text-transform: capitalize;',
    'normal-case': 'text-transform: none;',
    'sr-only': `position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border-width: 0;`,
    'not-sr-only': `position: static;
                    width: auto;
                    height: auto;
                    padding: 0;
                    margin: 0;
                    overflow: visible;
                    clip: auto;
                    white-space: normal;`,
    'inset-0': `top: 0;
                right: 0;
                bottom: 0;
                left: 0;`,
    'inset-y-0': `top: 0;
                  bottom: 0`,
    'inset-x-0': `right: 0;
                  left: 0;`,
    'inset-auto': `	top: auto;
                    right: auto;
                    bottom: auto;
                    left: auto;`,
    'inset-x-auto': `right: auto;
                     left: auto;`,
    'inset-y-auto': `top: auto;
                     bottom: auto;`,
    'flex-shrink': `flex-shrink: 1;`,
    'flex-shrink-0': `flex-shrink: 0;`,
    'flex-grow': `flex-grow: 1;`,
    'flex-grow-0': `flex-shrink: 0;`,
    'object-contain': 'object-fit: contain;',
    'object-cover': 'object-fit: cover;',
    'object-fill': 'object-fit: fill',
    'object-none': 'object-fit: none',
    'object-scale-down': 'object-fit: scale-down;',
    'object-bottom': 'object-position: bottom;',
    'object-center': 'object-position: center;',
    'object-left': 'object-position: left;',
    'object-left-bottom': 'object-position: left bottom;',
    'object-left-top': 'object-position: left top;',
    'object-right': 'object-position: right;',
    'object-right-bottom': 'object-position: right bottom;',
    'object-right-top': 'object-position: right top;',
    'object-top': 'object-position: top;',
    'bg-fixed': 'background-attachment: fixed;',
    'bg-local': 'background-attachment: local;',
    'bg-scroll': 'background-attachment: scroll;',
    'bg-bottom': 'background-position: bottom;',
    'bg-center': 'background-position: center;',
    'bg-left': 'background-position: center;',
    'bg-left-bottom': 'background-position: center;',
    'bg-left-top': 'background-position: center;',
    'bg-right': 'background-position: center;',
    'bg-right-bottom': 'background-position: center;',
    'bg-right-top': 'background-position: center;',
    'bg-top': 'background-position: top;',
    'bg-repeat': 'background-repeat: repeat;',
    'bg-no-repeat': 'background-repeat: no-repeat;',
    'bg-repeat-x': 'background-repeat: repeat-x;',
    'bg-repeat-y': 'background-repeat: repeat-y;',
    'bg-repeat-round': 'background-repeat: repeat-round;',
    'bg-repeat-space': 'background-repeat: space;',
    'bg-auto': 'background-size: auto;',
    'bg-cover': 'background-size: cover;',
    'bg-contain': 'background-size: contain;',
    'flex-row': 'flex-direction: row',
    'flex-row-reverse': 'flex-direction: row',
    'flex-col': 'flex-direction: column',
    'flex-col-reverse': 'flex-direction: column-reverse',
    'flex-wrap': 'flex-wrap: wrap;',
    'flex-wrap-reverse': 'flex-wrap: wrap-reverse;',
    'flex-no-wrap': 'flex-wrap: nowrap;',
    'items-stretch': 'align-items: stretch;',
    'items-start': 'align-items: flex-start;',
    'items-center': 'align-items: center;',
    'items-end': 'align-items: flex-end;',
    'items-baseline': 'align-items: baseline;',
    'content-start': 'align-content: flex-start;',
    'content-center': 'align-content: center;',
    'content-end': 'align-content: flex-end;',
    'content-between': 'align-content: space-between;',
    'content-around': 'align-content: space-around;',
    'self-auto': 'align-self: auto;',
    'self-start': 'align-self: flex-start;',
    'self-end': 'align-self: flex-end;',
    'self-center': 'align-self: center;',
    'self-stretch': 'align-self: stretch;',
    'justify-start': 'justify-content: flex-start;',
    'justify-end': 'justify-content: flex-end;',
    'justify-center': 'justify-content: center;',
    'justify-between': 'justify-content: space-between;',
    'justify-around': 'justify-content: space-around;',
    'justify-evenly': 'justify-content: space-evenly;',
    'border-solid': 'border-style: solid;',
    'border-dashed': 'border-style: dashed;',
    'border-dotted': 'border-style: dotted;',
    'border-double': 'border-style: double;',
    'border-none': 'border-style: none;',
    'select-none': 'user-select: none;',
    'select-text': 'user-select: text;',
    'select-all': 'user-select: all;',
    'select-auto': 'user-select: auto;',
    'border-collapse': 'border-collapse: collapse;',
    'border-separate': 'border-collapse: separate;',
    'shadow-xs': 'box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);',
    'shadow-sm': 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);',
    shadow:
      'box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);',
    'shadow-md':
      'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);',
    'shadow-lg':
      'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);',
    'shadow-xl':
      'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);',
    'shadow-2xl': 'box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);',
    'shadow-inner': 'box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);',
    'shadow-outline': 'box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);',
    'shadow-none': 'box-shadow: none;',
    'font-sans':
      'font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
    'font-serif':
      'font-family: Georgia, Cambria, "Times New Roman", Times, serif;',
    'font-mono':
      'font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
    'list-none': 'list-style-type: none',
    'list-disc': 'list-style-type: disc',
    'list-decimal': 'list-style-type: decimal',
    'list-inside': 'list-style-position: inside;',
    'list-outside': 'list-style-position: outside;',
    'text-left': 'text-align: left;',
    'text-center': 'text-align: center;',
    'text-right': 'text-align: right;',
    'text-justify': 'text-align: justify;',
    'align-baseline': 'vertical-align: baseline;',
    'align-top': 'vertical-align: top;',
    'align-middle': 'vertical-align: middle;',
    'align-bottom': 'vertical-align: bottom;',
    'align-text-top': 'vertical-align: text-top;',
    'align-text-bottom': 'vertical-align: text-bottom;',
    'whitespace-normal': 'white-space: normal;',
    'whitespace-no-wrap': 'white-space: nowrap;',
    'whitespace-pre': 'white-space: pre;',
    'whitespace-pre-line': 'white-space: pre-line;',
    'whitespace-pre-wrap': 'white-space: pre-wrap;',
    'resize-none': 'resize: none;',
    'resize-y': 'resize: vertical;',
    'resize-x': 'resize: horizontal;',
    resize: 'resize: both;',
    'fill-current': 'fill: currentColor',
    'stroke-current': 'stroke: currentColor;',
    'max-h-full': 'max-height: 100%;',
    'max-h-screen': 'max-height: 100vh;',
    'min-h-0': 'min-height: 0;',
    'min-h-full': 'min-height: 100%;',
    'min-h-screen': 'min-height: 100vh;',
    'min-w-0': 'min-width: 0;',
    'min-w-full': 'min-width: 100%;',
    'grid-flow-row': 'grid-auto-flow: row;',
    'grid-flow-col': 'grid-auto-flow: column;',
    'grid-flow-row-dense': 'grid-auto-flow: row dense',
    'grid-flow-col-dense': 'grid-auto-flow: column dense;'
  };

  private staticPropertyClassesRegEx = {
    float: /^float-(.*)/,
    overflow: /^overflow-(.*)/,
    appearance: /^appearance-(.*)/,
    pointerEvents: /^pointer-events-(.*)/,
    top: /^top-(.*)/,
    bottom: /^bottom-(.*)/,
    right: /^right-(.*)/,
    left: /^left-(.*)/,
    clear: /^clear-(.*)/
  };

  private staticPropertyClasses = Object.values(
    this.staticPropertyClassesRegEx
  );

  private dynamicPropertyClassesRegEx = {
    MARGIN: /^m(.)?-(.*)/,
    PADDING: /^p(.)?-(.*)/,
    SCALE: /^scale-(.*)/,
    BORDER: /^border-[0-9]/,
    BORDER_OPACITY: /^border-opacity-[0-9]/,
    BORDER_COLOR: /^border-(.*)-[0-9]/,
    BORDER_WITH_DIRECTION: /^border-(.)-[0-9]/,
    TEXT_COLOR: /^text-(.*)/,
    TEXT_SIZE: /^text-(xs|sm|base|lg|[0-9]xl)/,
    TEXT_WEIGHT: /^font-(hairline|thin|light|normal|medium|semibold|bold|extrabold|black)/,
    TEXT_OPACITY: /^text-opacity-[0-9]/,
    PLACEHOLDER_COLOR: /^placeholder-(.*)/,
    PLACEHOLDER_OPACITY: /^placeholder-opacity-[0-9]/,
    STROKE: /^stroke-[0-9]/,
    LETTER_SPACING: /^tracking-(tighter|tight|normal|wide|wider|widest)/,
    LINE_HEIGHT: /^leading-(.*)/,
    OPACITY: /^opacity-[0-9]/,
    MAX_WIDTH: /^max-w-(.*)/,
    WIDTH: /^w-(.*)/,
    HEIGHT: /^h-(.*)/
  };

  private dynamicPropertyClasses = Object.values(
    this.dynamicPropertyClassesRegEx
  );

  private semiPropertyDynamicClassesReEx = {
    BG: /bg-(.*)/
  };

  private semiPropertyDynamicClasses = Object.values(
    this.semiPropertyDynamicClassesReEx
  );

  constructor(config: any) {
    this.config = config;
  }

  // classes like clearfix, word-wrap etc.
  private hydrateCustomClasses(classes: string[]) {
    const hydratedCSS: string[] = classes.map(
      (className) => this.staticClasses[className] || className
    );

    return hydratedCSS;
  }

  // float-left => flat: left;
  // overflow-x-hidden => overflow-x: hidden;
  private hydratePropertyValueClasess(classes: string[]) {
    const hydratedCSS = classes.map((className) => {
      const propertyValueClass = this.staticPropertyClasses.find(
        (propertyValueClass) => propertyValueClass.test(className)
      );

      if (propertyValueClass) {
        // overflow-x-hidden
        // property = overflow, valueWithProperty => x-hidden;
        const [property, ...valueWithProperty] = className.split('-');
        // allProprty = overflow-x
        const allProperties = [
          property,
          ...valueWithProperty.slice(0, valueWithProperty.length - 1)
        ].join('-');

        return `${allProperties}: ${last(valueWithProperty)};`;
      } else {
        return className;
      }
    });

    return hydratedCSS;
  }

  // mt-10, m-10, p-10, pb-10
  private hydrateDynamicPropertyClasses(classes: string[]) {
    const hydratedCSS = classes.map((className) => {
      const dyanmicPopertyClass = this.dynamicPropertyClasses.find(
        (dynamicPropertyClass) => dynamicPropertyClass.test(className)
      );

      if (dyanmicPopertyClass) {
        // scale
        if (className.match(this.dynamicPropertyClassesRegEx.MARGIN)) {
          const [, direction, value] = className.match(
            dyanmicPopertyClass
          ) as any;

          const themeValue = this.config.theme.margin[value];
          const directionStringorArray = this.expandDirectionChar(direction);
          if (Array.isArray(directionStringorArray)) {
            return directionStringorArray.reduce((prev, direction) => {
              return `${prev}
                margin${direction}: ${themeValue};
                `;
            }, '');
          }

          return `margin${directionStringorArray}: ${themeValue};`;
        } else if (className.match(this.dynamicPropertyClassesRegEx.PADDING)) {
          const [, direction, value] = className.match(
            dyanmicPopertyClass
          ) as any;

          const themeValue = this.config.theme.spacing[value];
          const directionStringorArray = this.expandDirectionChar(direction);
          if (Array.isArray(directionStringorArray)) {
            return directionStringorArray.reduce((prev, direction) => {
              return `${prev}
                padding${direction}: ${themeValue};
                `;
            }, '');
          }

          return `padding${directionStringorArray}: ${themeValue};`;
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.BORDER_OPACITY)
        ) {
          const [, , opacity] = className.split('-');
          const opacityValue = parseInt(opacity) / 100;

          return `--border-opacity: ${opacityValue}`;
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.BORDER) ||
          className.match(
            this.dynamicPropertyClassesRegEx.BORDER_WITH_DIRECTION
          )
        ) {
          const props = className.split('-');

          // border-10
          if (props.length === 2) {
            const [, valueString] = props;
            const value = `${parseInt(valueString)}px`;

            return `border-width: ${value};`;
          }
          // border-t-10 or border-b-100
          else if (props.length === 3) {
            const [, direction, valueString] = props;
            const value = `${parseInt(valueString)}px`;
            const directionStringorArray = this.expandDirectionChar(direction);
            if (Array.isArray(directionStringorArray)) {
              return directionStringorArray.reduce((prev, direction) => {
                return `${prev}
                    border${direction}-width: ${value};
                `;
              }, '');
            }

            return `border${directionStringorArray}-width: ${value};`;
          }
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.TEXT_SIZE)
        ) {
          const [, size] = className.split('-');
          const fontSize = this.config.theme.fontSize[size];

          return `font-size: ${fontSize};`;
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.TEXT_WEIGHT)
        ) {
          const [, weight] = className.split('-');
          const fontWeight = this.config.theme.fontWeight[weight];

          return `font-weight: ${fontWeight};`;
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.PLACEHOLDER_OPACITY)
        ) {
          const [, , opacity] = className.split('-');
          const opacityValue = parseInt(opacity) / 100;

          return `--placeholder-opacity: ${opacityValue};`;
        } // for text-black, placeholder-black
        else if (
          className.match(this.dynamicPropertyClassesRegEx.TEXT_COLOR) ||
          className.match(this.dynamicPropertyClassesRegEx.PLACEHOLDER_COLOR)
        ) {
          const props = className.split('-');

          // text-black, text-trasparent
          if (props.length === 2) {
            const [, colorString] = props;
            const colorHex = this.config.theme.colors[colorString];

            return `color: ${colorHex};`;
          }
          // border-t-10 or border-b-100
          else if (props.length === 3) {
            const [, colorString, contrast] = props;
            const colorHex = this.config.theme.colors[colorString][contrast];

            return `color: ${colorHex};`;
          }
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.LETTER_SPACING)
        ) {
          const [, spacing] = className.split('-');
          const spacingValue = this.config.theme.letterSpacing[spacing];

          return `letter-spacing: ${spacingValue};`;
        } else if (className.match(this.dynamicPropertyClassesRegEx.STROKE)) {
          const [, value] = className.split('-');

          return `stroke-width: ${value};`;
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.LINE_HEIGHT)
        ) {
          const [, height] = className.split('-');
          const lineHeight = this.config.theme.lineHeight[height];

          return `line-height: ${lineHeight};`;
        } else if (className.match(this.dynamicPropertyClassesRegEx.OPACITY)) {
          const [, opacity] = className.split('-');
          const opacityValue = parseInt(opacity) / 100;

          return `opacity: ${opacityValue};`;
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.TEXT_OPACITY)
        ) {
          const [, , opacity] = className.split('-');
          const opacityValue = parseInt(opacity) / 100;

          return `opacity: ${opacityValue};`;
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.BORDER_COLOR)
        ) {
          const props = className.split('-');

          if (props.length === 2) {
            const [, color] = props;
            const colorHex = this.config.theme.colors[color];

            return `color: ${colorHex};`;
          } else if (props.length === 3) {
            const [, color, contrast] = props;
            const colorHex = this.config.theme.colors[color][contrast];

            return `color: ${colorHex};`;
          }
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.MAX_WIDTH)
        ) {
          const [, , breakpoint] = className.split('-');
          const size = this.config.theme.maxWidth[breakpoint];

          return `max-width: ${size};`;
        } else if (className.match(this.dynamicPropertyClassesRegEx.WIDTH)) {
          const [, width] = className.split('-');
          const widthValue = this.config.theme.width[width];

          return `width: ${widthValue};`;
        } else if (className.match(this.dynamicPropertyClassesRegEx.HEIGHT)) {
          const [, height] = className.split('-');
          const heightValue = this.config.theme.width[height];

          return `height: ${heightValue};`;
        }

        return className;
      } else {
        return className;
      }
    });

    return hydratedCSS;
  }

  // classes like bg-red, bg-green
  private hydrateSemiPropertyDynamicClasses(classes: string[]) {
    const hydratedCSS = classes.map((className) => {
      const semiPropertyDynamicClass = this.semiPropertyDynamicClasses.find(
        (semiPropertyDynamicClass) => semiPropertyDynamicClass.test(className)
      );

      if (semiPropertyDynamicClass) {
        if (className.startsWith('bg-')) {
          // color => red-500;
          const [, color] = className.match(semiPropertyDynamicClass) as any;
          const [colorName, contrast] = color.split('-');
          const themeColor = this.config.theme.colors[colorName][contrast];

          return `background: ${themeColor};`;
        } else {
          return className;
        }
      } else {
        return className;
      }
    });

    return hydratedCSS;
  }

  private expandDirectionChar(direction: string) {
    // TODO: change this switch to if else with pattern matching
    switch (direction) {
      case 'y':
        return ['-top', '-bottom'];
      case 'x':
        return ['-left', '-right'];
      case 't':
        return '-top';
      case 'b':
        return '-bottom';
      case 'r':
        return '-right';
      case 'l':
        return '-left';
    }

    return '';
  }

  genCSS(classes: string[]): string[] {
    const withCustomClasses = this.hydrateCustomClasses(classes);
    const withPropertyValueClasses = this.hydratePropertyValueClasess(
      withCustomClasses
    );
    const withDyanmicValueClasses = this.hydrateDynamicPropertyClasses(
      withPropertyValueClasses
    );
    const withSemiDynamicClasses = this.hydrateSemiPropertyDynamicClasses(
      withDyanmicValueClasses
    );

    return withSemiDynamicClasses;
  }
}
