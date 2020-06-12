import some from 'lodash-es/some';
import mergeWith from 'lodash-es/mergeWith';
import isFunction from 'lodash-es/isFunction';
import isUndefined from 'lodash-es/isUndefined';
import defaults from 'lodash-es/defaults';
import map from 'lodash-es/map';
import get from 'lodash-es/get';
import toPath from 'lodash-es/toPath';
import negateValue from './negateValue';

const configUtils = {
  negative(scale: any) {
    return Object.keys(scale)
      .filter((key) => scale[key] !== '0')
      .reduce(
        (negativeScale, key) => ({
          ...negativeScale,
          [`-${key}`]: negateValue(scale[key])
        }),
        {}
      );
  },
  breakpoints(screens: any) {
    return Object.keys(screens)
      .filter((key) => typeof screens[key] === 'string')
      .reduce(
        (breakpoints, key) => ({
          ...breakpoints,
          [`screen-${key}`]: screens[key]
        }),
        {}
      );
  }
};

function value(valueToResolve: any, ...args: any) {
  return isFunction(valueToResolve) ? valueToResolve(...args) : valueToResolve;
}

function mergeThemes(themes: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = (({ extend, ...t }: any) => t)(
    themes.reduce((merged: any, t: any) => {
      return defaults(merged, t);
    }, {})
  );

  return {
    ...theme,

    // In order to resolve n config objects, we combine all of their `extend` properties
    // into arrays instead of objects so they aren't overridden.
    extend: themes.reduce((merged: any, { extend }: any) => {
      return mergeWith(merged, extend, (mergedValue: any, extendValue: any) => {
        if (isUndefined(mergedValue)) {
          return [extendValue];
        }

        if (Array.isArray(mergedValue)) {
          return [extendValue, ...mergedValue];
        }

        return [extendValue, mergedValue];
      });
    }, {})
  };
}

function mergeExtensions({ extend, ...theme }: any) {
  return mergeWith(theme, extend, (themeValue: any, extensions: any) => {
    // The `extend` property is an array, so we need to check if it contains any functions
    if (!isFunction(themeValue) && !some(extensions, isFunction)) {
      return {
        ...themeValue,
        ...Object.assign({}, ...extensions)
      };
    }

    return (resolveThemePath: any, utils: any) => ({
      ...value(themeValue, resolveThemePath, utils),
      ...Object.assign(
        {},
        ...extensions.map((e: any) => value(e, resolveThemePath, utils))
      )
    });
  });
}

function resolveFunctionKeys(object: any) {
  const resolveThemePath = (key: any, defaultValue: any) => {
    const path = toPath(key);

    let index = 0;
    let val = object;

    while (val !== undefined && val !== null && index < path.length) {
      val = val[path[index++]];
      val = isFunction(val) ? val(resolveThemePath, configUtils) : val;
    }

    return val === undefined ? defaultValue : val;
  };

  return Object.keys(object).reduce((resolved, key) => {
    return {
      ...resolved,
      [key]: isFunction(object[key])
        ? object[key](resolveThemePath, configUtils)
        : object[key]
    };
  }, {});
}

function extractPluginConfigs(configs = []) {
  let allConfigs: any = [];

  configs.forEach((config) => {
    allConfigs = [...allConfigs, config];

    const plugins = get(config, 'plugins', []);

    if (plugins.length === 0) {
      return;
    }

    plugins.forEach((plugin: any) => {
      if (plugin.__isOptionsFunction) {
        plugin = plugin();
      }
      allConfigs = [
        ...allConfigs,
        ...extractPluginConfigs([get(plugin, 'config', {})] as any)
      ];
    });
  });

  return allConfigs;
}

export default function resolveConfig(configs: any) {
  const allConfigs = extractPluginConfigs(configs);

  return defaults(
    {
      theme: resolveFunctionKeys(
        mergeExtensions(
          mergeThemes(map(allConfigs, (t) => get(t, 'theme', {})))
        )
      ),
      variants: ((firstVariants) => {
        return Array.isArray(firstVariants)
          ? firstVariants
          : defaults({}, ...map(allConfigs, 'variants'));
      })(defaults({}, ...map(allConfigs)).variants)
    },
    ...allConfigs
  );
}
