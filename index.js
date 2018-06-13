'use strict';

const aapt          = require('./bin/aapt');
const parseText     = require('./bin/parseText');
const writeIconFile = require('./bin/writeIconFile');

async function parse(apkPath, aaptPath) {
  let stdout = await aapt(apkPath, aaptPath);
  stdout     = stdout.replace(/'/g, '');
  return parseText(stdout, '\n', ':');
}

module.exports = {parse, writeIconFile};
