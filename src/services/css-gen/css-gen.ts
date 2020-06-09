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
                    white-space: normal;`
  };

  private staticPropertyClasses = [
    /float-(.*)/,
    /overflow-(.*)/,
    /appearance-(.*)/,
    /pointer-events-(.*)/
  ];

  private dynamicPropertyClasses = [/m(.)?-(.*)/, /p(.)?-(.*)/];

  private semiPropertyDynamicClasses = [/bg-(.*)/];

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
        // switch based on the first letter whether it is m, p etc
        switch (className[0]) {
          case 'm': {
            const [, direction, value] = className.match(dyanmicPopertyClass);

            const themeValue = this.config.theme.margin[value];
            const directionString = this.getDirectionString(direction);

            return `margin${directionString}: ${themeValue};`;
          }
          case 'p': {
            const [, direction, value] = className.match(dyanmicPopertyClass);

            // TODO: not sure how to use this.config.theme.spacing
            const themeValue = this.config.theme.spacing[value];
            const directionString = this.getDirectionString(direction);

            return `padding${directionString}: ${themeValue};`;
          }
          default:
            return className;
        }
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
          const [, color] = className.match(semiPropertyDynamicClass);
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

  private getDirectionString(direction: string) {
    switch (direction) {
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

  genCSS(classes: string[]) {
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

    return withSemiDynamicClasses.join('');
  }
}
