'use strict';

const decompress = require('decompress');
const path       = require('path');
const mime       = require('mime-types');

module.exports = async function(apkFilePath, iconResPath, iconFilePath) {
  const file = await decompress(apkFilePath, path.dirname(iconFilePath), {
    filter: file => file.path === iconResPath,
    map   : file => {
      file.path = iconFilePath = `${path.basename(iconFilePath, path.extname(iconFilePath))}${path.extname(file.path)}`;
      return file;
    },
  });
  return {...file[0], mime: mime.lookup(iconFilePath)};
};

