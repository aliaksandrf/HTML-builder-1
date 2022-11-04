const path = require('path');
const fs = require('fs');


const source = path.join(__dirname, 'files');
const purpose = path.join(__dirname, 'files-copy');



fs.mkdir(purpose, { recursive: true }, (err) => {
  if(err) console.log(err);
})

fs.readdir(source, (err, files) => {
  files.forEach((item) => {
    const sourceFile = path.join(source, `${item}`);
    const purposeFile = path.join(purpose, `${item}`);
    fs.copyFile(sourceFile, purposeFile, (err) => {
      if(err) console.log(err);
    })
  })
})
