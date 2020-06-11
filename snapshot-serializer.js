// custom-snapshot-serializer.js
const prettyFormat = require('pretty-format');

module.exports = {
  test: (val) => typeof val === 'string',

  serialize: (val) => {
    return prettyFormat(val.trim().replace(/\\n/gi, ''))
      .trim()
      .replace(/\\r/gi, '')
      .trim();
  },

  config: { min: true, spacingInner: '', spacingOuter: '' }
};
