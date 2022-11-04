const path = require('path');
const fs = require('fs');


const pathStylesDir = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');


fs.writeFile(bundle, '', (err) => {
  if(err)console.log(err);
})


fs.readdir(pathStylesDir, {widthFileTypes: true}, (err, dirListFiles) => {
  if(err) console.log(err);


  dirListFiles.forEach((item) => {
    if(path.extname(item).slice(1) === 'css') {
      const pathFile = path.join(pathStylesDir, item);
      fs.readFile(pathFile, 'utf-8', (error, content) => {
        if(error) console.log(error);
        fs.appendFile(bundle, content, (err) => {
          if(err) console.log(err);
        })
      })
    }
  });
});



