'use strict';

const aapt          = require('./bin/aapt');
const parseText     = require('./bin/parseText');
const writeIconFile = require('./bin/writeIconFile');

async function parse(apkPath, aapt) {
  let stdout = await aapt(apkPath, aapt);
  stdout     = stdout.replace(/'/g, '');
  return parseText(stdout, '\n', ':');
}

module.exports = {parse, writeIconFile};
