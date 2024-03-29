#!/usr/bin/env node
'use strict';


const chalk = require('chalk');
const program = require('commander');
const spawn = require('win-spawn');
const join = require('path').join;
const resolve = require('path').resolve;
const exists = require('fs').existsSync;
const readFileSync = require('fs').readFileSync;

// Notify update when process exits
const updater = require('update-notifier');
const pkg = require('../package.json');
updater({ pkg: pkg }).notify({ defer: true });

if (process.argv.slice(2).join('') === '-v') {
  const pkg = require('../package');
  console.log('node-cli-demo version ' + pkg.version);
  try {
    const cwd = process.cwd();
    const npPkg = resolve('node_modules/node-cli-demo/package.json');
    const npVersion = JSON.parse(readFileSync(npPkg, 'utf-8')).version;
    console.log('    node-cli-demo version ' + npVersion);
  } catch (e) {
  }
  if (!(pkg._from && pkg._resolved)) {
    console.log(chalk.cyan('@local'));
  }
  return;
}

program
  .usage('<command> [options]')
  .on('--help', printHelp)
  .parse(process.argv);

const aliases = {
};
const args = process.argv.slice(3);
let subcmd = program.args[0];
if (aliases[subcmd]) subcmd = aliases[subcmd];

if (!subcmd) {
  program.help();
} else {
  const bin = executable(subcmd);
  if (bin) {
    console.log(bin);
    wrap(spawn(bin, args, {stdio: 'inherit', customFds: [0, 1, 2]}));
  } else {
    program.help();
  }
}

function wrap(sp) {
  sp.on('close', function(code) {
    process.exit(code);
  });
}

function printHelp() {
  console.log('  Commands:');
  console.log();
  console.log('    test           log test');
  console.log('    basic            log basic');
  console.log();
  console.log('  All commands can be run with -h (or --help) for more information.')
}

function executable(subcmd = 'test') {
  var file = join(__dirname, 'create-' + subcmd + '.js');
  if (exists(file)) {
    return file;
  }
}
