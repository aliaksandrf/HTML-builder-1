const path = require('path');
const fs = require('fs');

const pathDir = path.join(__dirname, 'project-dist');


// create project-dist

fs.stat(pathDir, (err) => {
  if(err) {
    fs.mkdir(pathDir, (err) => {
      if(err) console.log(err);
    });
  }
});


//copy assets

const pathAssetsSource = path.join(__dirname, 'assets');
const pathAssetsPurpose = path.join(pathDir, 'assets');

fs.stat(pathAssetsPurpose, (err) => {
  if(err) {
    fs.mkdir(pathAssetsPurpose, (err) => {
      if(err) console.log(err);
    });
  }
});

copyAssets(pathAssetsSource, pathAssetsPurpose);


function copyAssets(pathFunction, pathPurpose) {
  fs.readdir(pathFunction, (err, files) => {
    if(err) console.log(err);

    files.forEach(item => {
      const pathItem = path.join(pathFunction, item);
      const path2 = path.join(pathPurpose, item);
      fs.stat(pathItem, (err, stats) => {
        if (err) console.log(err);
        if(stats.isDirectory()) {
/*           console.log('isDirectory'); */

          fs.stat(path2, (err) => {
            if(err) {
              fs.mkdir(path2, (err) => {
                if(err) console.log(err);
              });
            }
          });

          copyAssets(pathItem, path2);
        } else {
/*           console.log('isFile');
          console.log(pathItem);
          console.log(path2); */
          fs.copyFile(pathItem, path2, err => {
            if(err) console.log(err);
          })

        }
      });
    })
  })

}




/* fs.readdir(pathAssetsSource, (err, files) => {
  if(err) console.log(err);
  files.forEach(item => {
    const pathItem = path.join(pathAssetsSource, item);
    fs.stat(pathItem, (err, stats) => {
      if (err) console.log(err);
      if(stats.isDirectory()) {
        console.log('isDirectory');
      } else {
        console.log('isFile');
      }
    });
  })
}) */



//create styles files

const stylesSource = path.join(__dirname, 'styles');
const styles = path.join(pathDir, 'styles.css');

fs.writeFile(styles, '', (err) => {
  if(err) console.log(err);
})

fs.readdir(stylesSource, (err, files) => {
  if(err) console.log(err);

  files.forEach(item => {
    console.log(item);
    const pathFile = path.join(stylesSource, item);
    fs.readFile(pathFile, (err, content) => {
      if(err) console.log(err);
      fs.appendFile(styles, content, (err) => {
        if(err) console.log(err);
      })
    })
  })

})





