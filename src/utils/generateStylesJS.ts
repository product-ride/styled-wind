import resolveConfigObjects from './resolveConfig';
import { defaultConfig } from './defaultConfig';

export default function resolveConfig(...configs: any) {
  return resolveConfigObjects([...configs, defaultConfig]);
}
