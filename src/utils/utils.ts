import { Theme } from '../theme/theme';
import { name } from '../../package.json';

export function warn(message: string) {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    console.warn(`${name}: warning: ${message}`);
  }
}

export function getColor(theme: Theme, colorName: string) {
  const [color, contrast] = colorName.split('-');
  const colorObj = theme.colors[color];

  if (!colorObj || !colorObj[contrast]) {
    warn(`no color found with name ${colorName} in theme`);

    return '';
  }

  return theme.colors[color][contrast];
}
