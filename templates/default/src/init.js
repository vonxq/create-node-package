import { join, basename } from 'path';
import vfs from 'vinyl-fs';
import { renameSync } from 'fs';
import through from 'through2';
import { sync as emptyDir } from 'empty-dir';
import leftPad from 'left-pad';
import chalk from 'chalk';
import inquirer from 'inquirer';

function info(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

function error(message) {
  console.error(chalk.red(message));
}

function success(message) {
  console.error(chalk.green(message));
}

function init({ type, install }) {
  const cwd = join(__dirname, '../templates', type);
  const dest = process.cwd();
  const projectName = basename(dest);

  if (!emptyDir(dest)) {
    error('Existing files here, please run init command in an empty folder!');
    process.exit(1);
  }

  console.log(`Creating a new node package app in ${dest}.`);
  console.log();

  vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(template(dest, cwd))
    .pipe(vfs.dest(dest))
    .on('end', function() {
      // info('rename', 'gitignore -> .gitignore');
      // renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'));
      if (install) {
        info('run', 'npm install');
        require('./install')(printSuccess);
      } else {
        printSuccess();
      }
    })
    .resume();

  function printSuccess() {
    success(`
Success! Created ${projectName} at ${dest}.

Inside that directory, you can run several commands:
    npm link

We suggest that you begin by typing:
  cd ${dest}
  npm link
  sayHi

Happy hacking!`);
  }
}

function template(dest, cwd) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    info('create', file.path.replace(cwd + '/', ''));
    this.push(file);
    cb();
  });
}

export default init
