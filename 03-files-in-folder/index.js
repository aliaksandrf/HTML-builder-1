const path = require('path');
const fs = require('fs');

const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, {withFileTypes: true}, (err, files) => {
  if(err) console.log(err);

/*   console.log(files); */

  files.forEach((item) => {

    if(item.isFile()) {
/*       console.log(item.name); */
      const pathFile = path.join(secretFolder, item.name);
/*       console.log(path.extname(pathFile).slice(1)); */

    fs.stat(pathFile, (err, stats) => {
      if(err) console.log(err);

      console.log(`nameFile - ${path.extname(pathFile).slice(1)} - ${stats.size / 1000} kb`);
    })

    }




  })



})