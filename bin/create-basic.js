#!/usr/bin/env node
const { createFolder }  = require('./utils')

const program = createFolder()
if (program) {
  require('../lib/init')({ ...program, type: 'basic' });
}