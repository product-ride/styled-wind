import resolveConfigObjects from './resolveConfig';
import { defaultConfig } from './defaultConfig';

module.exports = function resolveConfig(...configs: any) {
  return resolveConfigObjects([...configs, defaultConfig]);
};
