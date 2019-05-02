#!/usr/bin/env node

const program = require('commander');
const mkdirpSync = require('fs-extra').mkdirpSync;
const existsSync = require('fs').existsSync;
const join = require('path').join;
const chalk = require('chalk');
const error = chalk.red;
// 参数会进入program， {install: trues }
program
  .option('--install', 'Install dependencies after boilerplate, default: false')
  .parse(process.argv);

module.exports['createFolder'] = function () {
  if (!program.args[0]) {
    program.help();
  } else {
    const dest = join(process.cwd(), program.args[0]);
    if (existsSync(dest)) {
      console.error(error('Existing directory here, please run new command for an empty folder!'));
      process.exit(1);
    }
    mkdirpSync(dest);
    process.chdir(dest);
    return program;
  }
}
