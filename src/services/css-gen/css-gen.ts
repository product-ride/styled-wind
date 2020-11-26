import last from 'lodash-es/last';
import { warn } from '../../utils/utils';

const SWIND_API_REGEX = /^swind/;

export class CSSGen {
  // stores the theme config object
  private config: any;
  // classes which need no regex matching
  private staticClasses = {
    container: 'width: 100%;',
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
    hidden: 'display: none;',
    block: 'display: block;',
    inline: 'display: inline;',
    'inline-block': 'display: inline-block;',
    flex: 'display: flex;',
    'inline-flex': 'display: inline-flex;',
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
    invisible: 'visibility: hidden;',
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
                  bottom: 0;`,
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
    'object-fill': 'object-fit: fill;',
    'object-none': 'object-fit: none;',
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
    'flex-row': 'flex-direction: row;',
    'flex-row-reverse': 'flex-direction: row;',
    'flex-col': 'flex-direction: column;',
    'flex-col-reverse': 'flex-direction: column-reverse;',
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
    border: 'border-width: 1px;',
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
    'list-none': 'list-style-type: none;',
    'list-disc': 'list-style-type: disc;',
    'list-decimal': 'list-style-type: decimal;',
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
    'fill-current': 'fill: currentColor;',
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
    'grid-flow-row-dense': 'grid-auto-flow: row dense;',
    'grid-flow-col-dense': 'grid-auto-flow: column dense;',
    'table-auto': 'table-layout: auto;',
    'table-fixed': 'table-layout: fixed;'
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

  private static isStyleWindClass(classNameOrStyle: string) {
    return (
      this.usesDotNotationAPI(classNameOrStyle) ||
      this.usesSwindAPI(classNameOrStyle)
    );
  }

  private staticPropertyClasses = Object.values(
    this.staticPropertyClassesRegEx
  );

  private dynamicPropertyClassesRegEx = {
    MARGIN: /^m(.)?-(.*)/,
    PADDING: /^p(.)?-(.*)/,
    SCALE: /^scale-(.*)/,
    BORDER: /^border-[0-9]/,
    BORDER_OPACITY: /^border-opacity-[0-9]/,
    BORDER_COLOR: /^border-(?!opacity)(.*)-[0-9]/,
    BORDER_WITH_DIRECTION: /^border-(.)-[0-9]/,
    TEXT_SIZE: /^text-(xs|sm|base|lg|[0-9]xl)$/,
    TEXT_WEIGHT: /^font-(hairline|thin|light|normal|medium|semibold|bold|extrabold|black)$/,
    TEXT_OPACITY: /^text-opacity-[0-9]/,
    TEXT_COLOR: /^text-(?!opacity)(.*)/,
    PLACEHOLDER_OPACITY: /^placeholder-opacity-[0-9]/,
    PLACEHOLDER_COLOR: /^placeholder-(?!opacity)(.*)/,
    STROKE: /^stroke-[0-9]/,
    LETTER_SPACING: /^tracking-(tighter|tight|normal|wide|wider|widest)/,
    LINE_HEIGHT: /^leading-(.*)/,
    OPACITY: /^opacity-[0-9]/,
    MAX_WIDTH: /^max-w-(.*)/,
    WIDTH: /^w-(.*)/,
    HEIGHT: /^h-(.*)/,
    GRID_TEMPLATE_COLS: /^grid-cols-(.*)/,
    GRID_TEMPLATE_ROWS: /^grid-rows-(.*)/,
    GRID_ROW: /^((row-(start|end|span)-(.*))|row-auto)$/,
    GRID_COL: /^((col-(start|end|span)-(.*))|col-auto)$/,
    GRID_GAP: /^gap-[0-9]/,
    GRID_ROW_GAP: /^row-gap-[0-9]/,
    GRID_COL_GAP: /^col-gap-[0-9]/,
    BORDER_RADIUS: /^(rounded$|(rounded-(.*)$)|(rounded-(.*)-(.*)))/,
    BG_OPACITY: /^bg-opacity-[0-9]/,
    BG: /bg-(?!opacity)(.*)/,
    ZINDEX: /z-(.*)/,
    CURSOR: /cursor-(.*)/
  };

  private dynamicPropertyClasses = Object.values(
    this.dynamicPropertyClassesRegEx
  );

  constructor(config: any) {
    this.config = config;
  }

  // classes like clearfix, word-wrap etc.
  private hydrateStaticClasses(className: string) {
    return this.staticClasses[CSSGen.getClassName(className)] || className;
  }

  // float-left => flat: left;
  // overflow-x-hidden => overflow-x: hidden;
  private hydratePropertyValueClasses(className: string) {
    const styledClassName = CSSGen.getClassName(className);
    const propertyValueClass = this.staticPropertyClasses.find(
      (propertyValueClass) => propertyValueClass.test(styledClassName)
    );

    if (propertyValueClass) {
      // overflow-x-hidden
      // property = overflow, valueWithProperty => x-hidden;
      const [property, ...valueWithProperty] = styledClassName.split('-');
      // allProprty = overflow-x
      const allProperties = [
        property,
        ...valueWithProperty.slice(0, valueWithProperty.length - 1)
      ].join('-');

      return `${allProperties}: ${last(valueWithProperty)};`;
    } else {
      return className;
    }
  }

  // mt-10, m-10, p-10, pb-10
  private hydrateDynamicPropertyClasses(className: string) {
    const styledClassName = CSSGen.getClassName(className);

    const dyanmicPopertyClass = this.dynamicPropertyClasses.find(
      (dynamicPropertyClass) => dynamicPropertyClass.test(styledClassName)
    );

    if (dyanmicPopertyClass) {
      // scale
      if (styledClassName.match(this.dynamicPropertyClassesRegEx.MARGIN)) {
        const [, direction, value] = styledClassName.match(
          dyanmicPopertyClass
        ) as any;

        const themeValue = this.config.theme.margin[value];
        const directionStringorArray = CSSGen.expandDirectionChar(direction);
        if (Array.isArray(directionStringorArray)) {
          return directionStringorArray.reduce((prev, direction) => {
            return `${prev}
                margin${direction}: ${themeValue};
                `;
          }, '');
        }

        return `margin${directionStringorArray}: ${themeValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.PADDING)
      ) {
        const [, direction, value] = styledClassName.match(
          dyanmicPopertyClass
        ) as any;

        const themeValue = this.config.theme.spacing[value];
        const directionStringorArray = CSSGen.expandDirectionChar(direction);
        if (Array.isArray(directionStringorArray)) {
          return directionStringorArray.reduce((prev, direction) => {
            return `${prev}
                padding${direction}: ${themeValue};
                `;
          }, '');
        }

        return `padding${directionStringorArray}: ${themeValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.BORDER_OPACITY)
      ) {
        const [, , opacity] = styledClassName.split('-');
        const opacityValue = parseInt(opacity) / 100;

        return `--border-opacity: ${opacityValue}`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.BORDER) ||
        styledClassName.match(
          this.dynamicPropertyClassesRegEx.BORDER_WITH_DIRECTION
        )
      ) {
        const props = styledClassName.split('-');

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
          const directionStringorArray = CSSGen.expandDirectionChar(direction);
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
        styledClassName.match(this.dynamicPropertyClassesRegEx.TEXT_SIZE)
      ) {
        const [, size] = styledClassName.split('-');
        const fontSize = this.config.theme.fontSize[size];

        return `font-size: ${fontSize};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.TEXT_WEIGHT)
      ) {
        const [, weight] = styledClassName.split('-');
        const fontWeight = this.config.theme.fontWeight[weight];

        return `font-weight: ${fontWeight};`;
      } else if (
        styledClassName.match(
          this.dynamicPropertyClassesRegEx.PLACEHOLDER_OPACITY
        )
      ) {
        const [, , opacity] = styledClassName.split('-');
        const opacityValue = parseInt(opacity) / 100;

        return `::placeholder {
        opacity: ${opacityValue};
        }`;
      } // for text-black, placeholder-black
      else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.TEXT_COLOR) ||
        styledClassName.match(
          this.dynamicPropertyClassesRegEx.PLACEHOLDER_COLOR
        )
      ) {
        const props = styledClassName.split('-');

        // text-black, text-trasparent
        if (props.length === 2) {
          const [textOrPlaceholder, colorString] = props;
          const colorHex = this.config.theme.colors[colorString];

          return textOrPlaceholder === 'text'
            ? `color: ${colorHex};`
            : `::placeholder {
          color: ${colorHex};
          }`;
        }
        // text-red-100, text-green-200
        else if (props.length === 3) {
          const [textOrPlaceholder, colorString, contrast] = props;
          const colorHex = this.config.theme.colors[colorString][contrast];

          return textOrPlaceholder === 'text'
            ? `color: ${colorHex};`
            : `::placeholder {
          color: ${colorHex};
          }`;
        }
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.LETTER_SPACING)
      ) {
        const [, spacing] = styledClassName.split('-');
        const spacingValue = this.config.theme.letterSpacing[spacing];

        return `letter-spacing: ${spacingValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.STROKE)
      ) {
        const [, value] = styledClassName.split('-');

        return `stroke-width: ${value};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.LINE_HEIGHT)
      ) {
        const [, height] = styledClassName.split('-');
        const lineHeight = this.config.theme.lineHeight[height];

        return `line-height: ${lineHeight};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.OPACITY)
      ) {
        const [, opacity] = styledClassName.split('-');
        const opacityValue = parseInt(opacity) / 100;

        return `opacity: ${opacityValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.TEXT_OPACITY)
      ) {
        const [, , opacity] = styledClassName.split('-');
        const opacityValue = parseInt(opacity) / 100;

        return `opacity: ${opacityValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.BORDER_COLOR)
      ) {
        const props = styledClassName.split('-');

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
        styledClassName.match(this.dynamicPropertyClassesRegEx.MAX_WIDTH)
      ) {
        const [, , breakpoint] = styledClassName.split('-');
        const size = this.config.theme.maxWidth[breakpoint];

        return `max-width: ${size};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.WIDTH)
      ) {
        const [, width] = styledClassName.split('-');
        const widthValue = this.config.theme.width[width];

        return `width: ${widthValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.HEIGHT)
      ) {
        const [, height] = styledClassName.split('-');
        const heightValue = this.config.theme.width[height];

        return `height: ${heightValue};`;
      } else if (
        styledClassName.match(
          this.dynamicPropertyClassesRegEx.GRID_TEMPLATE_COLS
        )
      ) {
        const [, , templateValue] = styledClassName.split('-');

        if (templateValue.trim() === 'none') {
          return 'grid-template-columns: none;';
        } else {
          return `grid-template-columns: repeat(${templateValue}, minmax(0, 1fr));`;
        }
      } else if (
        styledClassName.match(
          this.dynamicPropertyClassesRegEx.GRID_TEMPLATE_ROWS
        )
      ) {
        const [, , templateValue] = styledClassName.split('-');

        if (templateValue.trim() === 'none') {
          return 'grid-template-rows: none;';
        } else {
          return `grid-template-rows: repeat(${templateValue}, minmax(0, 1fr));`;
        }
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.GRID_ROW)
      ) {
        const props = styledClassName.split('-');

        if (props.length === 2) {
          const [, value] = props;

          return value.trim() === 'auto' ? `grid-row: auto;` : styledClassName;
        } else if (props.length === 3) {
          const [, type, value] = props;

          if (type === 'span') {
            return `grid-row: span ${value} / span ${value};`;
          } else if (type === 'end' || type === 'start') {
            return `grid-row-${type}: ${value};`;
          }
        }
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.GRID_COL)
      ) {
        const props = styledClassName.split('-');

        if (props.length === 2) {
          const [, value] = props;

          return value.trim() === 'auto' ? `grid-col: auto;` : styledClassName;
        } else if (props.length === 3) {
          const [, type, value] = props;

          if (type === 'span') {
            return `grid-col: span ${value} / span ${value};`;
          } else if (type === 'end' || type === 'start') {
            return `grid-col-${type}: ${value};`;
          }
        }
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.GRID_GAP)
      ) {
        const [, gap] = styledClassName.split('-');
        const gapValue = this.config.theme.gap[gap];

        return `gap: ${gapValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.GRID_ROW_GAP)
      ) {
        const [, , gap] = styledClassName.split('-');
        const gapValue = this.config.theme.gap[gap];

        return `row-gap: ${gapValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.GRID_COL_GAP)
      ) {
        const [, , gap] = styledClassName.split('-');
        const gapValue = this.config.theme.gap[gap];

        return `col-gap: ${gapValue};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.BORDER_RADIUS)
      ) {
        const props = styledClassName.split('-');
        const defaultRadius = this.config.theme.borderRadius.default;
        const directions = ['t', 'b', 'r', 'l', 'tr', 'tl', 'br', 'bl'];
        const getBorderRadiusForDirection = (
          direction: string,
          radiusValue: string
        ) => {
          switch (direction) {
            case 't': {
              return `
                  border-top-left-radius: ${radiusValue};
                  border-top-right-radius: ${radiusValue};
                  `;
            }
            case 'b': {
              return `
                  border-bottom-right-radius: ${radiusValue};
                  border-bottom-left-radius: ${radiusValue};
                  `;
            }
            case 'l': {
              return `
                  border-top-left-radius: ${radiusValue};
                  border-bottom-left-radius: ${radiusValue};
                  `;
            }
            case 'r': {
              return `
                  border-top-right-radius: 0.25rem;
                  border-bottom-right-radius: 0.25rem;
                `;
            }
            case 'tl': {
              return `
                  border-top-left-radius: ${radiusValue};
                `;
            }
            case 'tr': {
              return `
                  border-top-right-radius: ${radiusValue};
                `;
            }
            case 'br': {
              return `
                  border-bottom-right-radius: ${radiusValue};
                `;
            }
            default:
              return '';
          }
        };

        if (props.length === 1) {
          return `border-radius: ${defaultRadius};`;
        } else if (props.length === 2) {
          const [, sizeOrDirection] = props;

          if (directions.includes(sizeOrDirection.trim())) {
            return getBorderRadiusForDirection(
              sizeOrDirection.trim(),
              defaultRadius
            );
          } else {
            const radiusValue = this.config.theme.borderRadius[sizeOrDirection];

            return `border-radius: ${radiusValue};`;
          }
        } else if (props.length === 3) {
          const [, direction, size] = props;
          const radiusValue = this.config.theme.borderRadius[size];

          return getBorderRadiusForDirection(direction, radiusValue);
        } else {
          return styledClassName;
        }
      } else if (styledClassName.match(this.dynamicPropertyClassesRegEx.BG)) {
        // color => red-500;
        const [, colorName, contrast] = styledClassName.split('-');
        let themeColor;

        if (contrast) {
          themeColor = this.config.theme.colors[colorName][contrast];
        } else {
          themeColor = this.config.theme.colors[colorName];
        }

        return `background: ${themeColor};`;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.BG_OPACITY)
      ) {
        const [, , opacity] = styledClassName.split('-');
        const opacityValue = parseInt(opacity) / 100;

        return `
        opacity: ${opacityValue};
        `;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.ZINDEX)
      ) {
        const [, zindex] = styledClassName.split('-');
        const zindexValue = zindex !== 'auto' ? parseInt(zindex) : zindex;

        return `
        z-index: ${zindexValue};
        `;
      } else if (
        styledClassName.match(this.dynamicPropertyClassesRegEx.CURSOR)
      ) {
        const [, cursor] = styledClassName.split('-');
        const cursorValue = cursor;

        return `
        cursor: ${cursorValue};
        `;
      }

      return className;
    } else {
      return className;
    }
  }

  private static expandDirectionChar(direction: string) {
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

  private static getClassName(className: string) {
    if (this.usesSwindAPI(className)) {
      const [, classNamePart] = className.split(':');

      return classNamePart.trim().split(';')[0];
    } else {
      return className.substr(1);
    }
  }

  private hydrateNormalClasses(className: string): string {
    if (!CSSGen.isStyleWindClass(className)) return className;

    // it may be static class
    let css = this.hydrateStaticClasses(className);

    if (CSSGen.isStyleWindClass(css)) {
      // if it is not static it may be property value type
      css = this.hydratePropertyValueClasses(className);

      // fuck it, it must be atleast dynamic property class
      if (CSSGen.isStyleWindClass(css)) {
        css = this.hydrateDynamicPropertyClasses(className);
      }
    }

    if (CSSGen.isStyleWindClass(css)) {
      // well we did our best but we don't support this class name
      warn(`unknown class name ${css}`);
    }

    return css;
  }

  private hydratePseudoClasses(pseudoClass: string) {
    if (!CSSGen.isStyleWindClass(pseudoClass)) return `${pseudoClass};`;

    const sm = this.config.theme.screens.sm;
    const md = this.config.theme.screens.md;
    const lg = this.config.theme.screens.lg;

    const [prefix, className] = CSSGen.getPseudoAndClassName(pseudoClass);

    switch (prefix.trim()) {
      case 'hover': {
        const hydratedHoverClasses = this.hydrateNormalClasses(
          `.${className.trim()}`
        );

        return `&:hover {
        ${hydratedHoverClasses}
        }`;
      }
      case 'active': {
        const hydratedActiveClasses = this.hydrateNormalClasses(
          `.${className.trim()}`
        );

        return `&:active {
        ${hydratedActiveClasses}
        }`;
      }
      case 'sm': {
        const hydratedSmClasses = this.hydrateNormalClasses(
          `.${className.trim()}`
        );

        return `@media (min-width: ${sm}) {
        ${hydratedSmClasses}
        }`;
      }
      case 'lg': {
        const hydratedMdClasses = this.hydrateNormalClasses(
          `.${className.trim()}`
        );

        return `@media (min-width: ${md}) {
        ${hydratedMdClasses}
        }`;
      }
      case 'md': {
        const hydrateLgClasses = this.hydrateNormalClasses(
          `.${className.trim()}`
        );

        return `@media (min-width: ${lg}) {
        ${hydrateLgClasses}
        }`;
      }
      default: {
        warn(`unknown pseudo class ${prefix}`);

        return className;
      }
    }
  }

  private static isPseudoClass(className: string) {
    if (CSSGen.usesSwindAPI(className)) {
      const [keyword] = className.trim().split(':');

      return keyword.split('-').length > 1;
    } else {
      return className.split(':').length > 1;
    }
  }

  private static getPseudoAndClassName(pseudoClassName: string) {
    if (CSSGen.usesSwindAPI(pseudoClassName)) {
      const [keyword] = pseudoClassName.split(':');
      const [, pseudo] = keyword.trim().split('-');

      return [pseudo, CSSGen.getClassName(pseudoClassName)];
    } else {
      return CSSGen.getClassName(pseudoClassName).split(':');
    }
  }

  // check if it is like swind: bg-red-200;
  private static usesSwindAPI(className: string) {
    const [keyword] = className.trim().split(':');

    return keyword.trim().match(SWIND_API_REGEX);
  }

  private static usesDotNotationAPI(className: string) {
    return className.trim().startsWith('.');
  }

  genCSS(classes: string[] | string): string {
    if (!Array.isArray(classes)) {
      return CSSGen.isPseudoClass(classes)
        ? this.hydratePseudoClasses(classes)
        : this.hydrateNormalClasses(classes);
    } else {
      const normalClasses = classes.filter(
        (className) => !CSSGen.isPseudoClass(className)
      );
      const pseudoClasses = classes.filter(CSSGen.isPseudoClass);
      const normalCSS = normalClasses
        .map(this.hydrateNormalClasses, this)
        .join('');
      const pseudoCSS = pseudoClasses
        .map(this.hydratePseudoClasses, this)
        .join('');

      return `
      ${normalCSS}
      ${pseudoCSS}
    `;
    }
  }
}
