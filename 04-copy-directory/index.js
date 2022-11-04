const path = require('path');
const fs = require('fs');
const { readdir, copyFile, mkdir, rm } = require('fs').promises;
const { stdout } = process;


const source = path.join(__dirname, 'files');
const purpose = path.join(__dirname, 'files-copy');

(async function() {

  await rm(purpose, {recursive: true, force: true});
  await mkdir(purpose, {recursive: true});
  await copyFiles(source, purpose);


})();

async function copyFiles (source, purpose) {
  try {
    const dir = await readdir(source, { withFileTypes: true });
    for (const file of dir) {
      if (file.isFile()) {
        await copyFile(path.join(source, file.name), path.join(purpose, file.name));
      } else if (file.isDirectory()) {
        await mkdir(path.join(to, file.name));
        await copyDir(path.join(source, file.name), path.join(purpose, file.name));
      }
    }
  } catch (error) {
    stdout.write(error.message);
  }
}



/* fs.mkdir(purpose, { recursive: true }, (err) => {
  if(err) console.log(err);
}) */




/* fs.readdir(source, (err, files) => {
  files.forEach((item) => {
    const sourceFile = path.join(source, `${item}`);
    const purposeFile = path.join(purpose, `${item}`);
    fs.copyFile(sourceFile, purposeFile, (err) => {
      if(err) console.log(err);
    })
  })
}) */
