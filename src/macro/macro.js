const { createMacro } = require('babel-plugin-macros');

module.exports = createMacro(evilMacro);

function evilMacro({ references, babel }) {
  references.default.forEach((referencePath) => {
    const quasiPath = referencePath.parentPath.get('quasi');
    const valueString = quasiPath.parentPath.get('quasi').evaluate().value;
    const value = evaluate(valueString);
    const valueNode = valueToASTNode(value, babel);
    quasiPath.parentPath.replaceWith(valueNode);
  });
}

function evaluate(value) {
  let x;
  // eslint-disable-next-line
  eval(`x = ${value}`);
  return x;
}

function valueToASTNode(value, babel) {
  const fileNode = babel.parse(`var x = ${JSON.stringify(value)}`);
  return fileNode.program.body[0].declarations[0].init;
}
