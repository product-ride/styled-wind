import { createMacro } from 'babel-plugin-macros';

const styledwindMacro = (options: any) => {
  console.log(options);
};

export const macro = createMacro(styledwindMacro);
