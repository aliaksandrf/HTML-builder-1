const path = require('path');
const fs = require('fs');
const { readFile, readdir, writeFile } = require('fs').promises;

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
const styles = path.join(pathDir, 'style.css');

fs.stat(styles, (err) => {
  if(err) {
    fs.writeFile(styles, '', (err) => {
      if(err) console.log(err);
    })
  }
});






fs.readdir(stylesSource, (err, files) => {
  if(err) console.log(err);

  files.forEach(item => {
/*     console.log(item); */
    const pathFile = path.join(stylesSource, item);
    fs.readFile(pathFile, (err, content) => {
      if(err) console.log(err);
      fs.appendFile(styles, content, (err) => {
        if(err) console.log(err);
      })
    })
  })

})


//read template




async function createHtmlTemplate() {
  const templateFile = path.join(__dirname, 'template.html');
  const purposeFile = path.join(__dirname, 'project-dist', 'index.html');
  const componentsPath = path.join(__dirname, 'components');

/*   console.log(templateFile); */
  let htmlCode = await readFile(templateFile, 'utf-8');
/*   console.log(htmlCode); */

  const componentsFiles = await readdir(componentsPath, { withFileTypes: true });
/*   console.log(componentsFiles); */

  for(let file of componentsFiles) {
    const pathFile = path.join(componentsPath, file.name);
  /*   console.log(pathFile); */
    const contentFile = await readFile(pathFile, 'utf-8');
/*     console.log(contentFile); */
 const regularExpr = file.name.replace(/\.[^/.]+$/, "");

 htmlCode = htmlCode.replace(`{{${regularExpr}}}`, contentFile);
 
  }

  await writeFile(purposeFile, htmlCode);




}



(async () => {
  createHtmlTemplate();
})();



/* 
fs.readFile(templateFile, 'utf-8', (err, content) => {
  if(err) console.log(err);
  templateContent = content;
  addText(content);


    fs.readdir(componentsPath, (err, files) => {
      if(err) console.log(err);
      files.forEach(item => {

        const localPath = path.join(componentsPath, item);
        fs.readFile(localPath, "utf8", function(err,data){
          if(err) console.log(err);

          replaceText(`{{${path.parse(item).name}}}}`, data);
        });
      })
    })
});

function addText(newText) {
  templateContent = newText;
}
function replaceText (oldText, newText) {
} */
 





