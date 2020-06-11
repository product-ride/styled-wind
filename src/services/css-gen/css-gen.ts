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
    'flex-grow-0': `flex-shrink: 0;`
  };

  private staticPropertyClasses = [
    /float-(.*)/,
    /overflow-(.*)/,
    /appearance-(.*)/,
    /pointer-events-(.*)/,
    /top-(.*)/,
    /bottom-(.*)/,
    /right-(.*)/,
    /left-(.*)/
  ];

  private dynamicPropertyClassesRegEx = {
    MARGIN: /m(.)?-(.*)/,
    PADDING: /p(.)?-(.*)/,
    SCALE: /scale-(.*)/,
    BORDER: /border-[0-9]/,
    BORDER_WITH_DIRECTION: /border-(.*)-[0-9]/,
    TEXT: /text-(.*)/,
    PLACEHOLDER: /placeholder-(.*)/
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
        } else if (className.match(this.dynamicPropertyClassesRegEx.SCALE)) {
          const props = className.split('-');

          // scale-10
          if (props.length === 2) {
            const [, valueString] = props;
            const value = parseInt(valueString) / 100;

            return `--transform-scale-x: ${value};
                        --transform-scale-y: ${value};`;
          }
          // scale-x-0 or scale-y-100
          else if (props.length === 3) {
            const [, axis, valueString] = props;
            const value = parseInt(valueString) / 100;

            return `--transform-scale-${axis}: ${value};`;
          }
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
          // for text-black, placeholder-black
        } else if (
          className.match(this.dynamicPropertyClassesRegEx.TEXT) ||
          className.match(this.dynamicPropertyClassesRegEx.PLACEHOLDER)
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
