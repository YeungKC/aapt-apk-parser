'use strict';

const decompress = require('decompress');
const path       = require('path');

module.exports = async function(apkFilePath, iconResPath, iconFilePath) {
  return await decompress(apkFilePath, path.dirname(iconFilePath), {
    filter: file => file.path === iconResPath,
    map   : file => {
      file.path = `${path.basename(iconFilePath, path.extname(iconFilePath))}${path.extname(file.path)}`;
      return file;
    },
  });
};

