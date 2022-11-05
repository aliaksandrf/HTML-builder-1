const path = require('path');
const fs = require('fs');

const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, {withFileTypes: true}, (err, files) => {
  if(err) console.log(err);

  files.forEach((item) => {
    if(item.isFile()) {
      const pathFile = path.join(secretFolder, item.name);
      fs.stat(pathFile, (err, stats) => {
        if(err) console.log(err);
        console.log(`${path.parse(pathFile).name} - ${path.extname(pathFile).slice(1)} - ${stats.size / 1000} kb`);
      })
    }
  })
})