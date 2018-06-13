'use strict';

const {parse, writeIconFile} = require('./../index');
const path                   = require('path');

const filePath = './test/Greenify_v3.9.9.1_apkpure.com.apk';

(async function foo() {
  const body = await parse(filePath);

  console.log(JSON.stringify(body, null, 4));

  const sizes = [640, 320, 240, 160];
  for (const size of sizes) {
    let iconResPath = body['application-icon-' + size];
    if (typeof iconResPath !== 'undefined') {
      const file = await writeIconFile(filePath, iconResPath, './test/test');

      console.log(file);
      return;
    }
  }
})();
