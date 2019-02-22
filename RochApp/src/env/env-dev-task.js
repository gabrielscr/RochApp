const fs = require('fs');

fs.copyFile('.\\src\\env\\env-dev.ts', '.\\src\\env\\index.ts', (err) => {
  if (err) throw err;
});
