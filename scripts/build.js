const shell = require('shelljs');
const path = require('path');

if (shell.exec('yarn build-lib').code === 0) {
  if (
    shell.cp(
      path.join(process.cwd(), 'src', 'index.d.ts'),
      path.join(process.cwd(), 'dist')
    ).code === 0
  ) {
    console.log('DONE');
  } else {
    console.log('FAILED');
  }
} else {
  console.log('FAILED');
}
