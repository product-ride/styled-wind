import { name } from '../../package.json';

export function warn(message: string) {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    console.warn(`${name}: warning: ${message}`);
  }
}
