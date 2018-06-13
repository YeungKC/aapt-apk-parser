'use strict';

const parseText = function(stdout, splitter, insideSplitter) {
  if (stdout.indexOf(splitter) === -1) return stdout;

  const infos = stdout.split(splitter);
  let result  = {};

  for (let info of infos) {
    if (!info) continue;

    if (info.indexOf(insideSplitter) !== -1) {
      info = info.split(insideSplitter);
      if (info.length !== 2) continue;

      const key         = info[0].trim();
      const valueString = info[1].trim();
      let value;

      if (key === 'uses-implied-feature') {
        value = valueString;
      } else {
        value = parseText(valueString, ' ', '=');
        if (Object.keys(value).length === 0) {
          value = valueString;
        }
      }

      if (!result[key]) {
        result[key] = value;
      } else {
        if (Array.isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      }
    } else {
      if (typeof result.other === 'undefined') {
        result.other = [];
      }
      result.other.push(info);
    }
  }

  const keys = Object.keys(result);
  if (keys.length === 1 && keys[0] === 'other') {
    result = [...result.other];
  }
  return result;
};

module.exports = parseText;
