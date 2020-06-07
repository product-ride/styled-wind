import { name } from '../../package.json';

export function warn(message: string) {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    console.warn(`${name}: warning: ${message}`);
  }
}

export function hydrateWithCSS(
  string: string,
  styleSheet: Record<string, string>
) {
  const styles = string.split(';').map((style) => style.trim());
  let hydratedStyles = ``;

  for (const style of styles) {
    if (style.startsWith('.')) {
      const hydratedStyle = styleSheet[style.substr(1)];

      if (hydratedStyle) {
        hydratedStyles = `${hydratedStyles}${hydratedStyle};`;
      } else {
        warn(`unknown class ${style}`);
      }
    } else if (style.length > 0) {
      hydratedStyles = `${hydratedStyles}${style};`;
    }
  }

  return hydratedStyles;
}
