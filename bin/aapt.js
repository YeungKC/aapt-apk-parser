'use strict';

const path = require('path');
const os   = require('os');
const exec = require('child_process').exec;

module.exports = function(apkPath, aapt) {
  return new Promise((resolve, reject) => {
    const aapt    = aapt || path.join(__dirname, 'aapt_' + os.platform());
    const command = aapt + ' d badging ' + apkPath;

    exec(command, function(err, stdout, stderr) {
      if (err) reject(err);
      if (stderr) reject(new Error(stderr));

      resolve(stdout);
    });
  });
};
