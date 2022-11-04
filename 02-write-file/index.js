
const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit, error} = process;

const file = path.join(__dirname, 'note.txt');


const stream = fs.createWriteStream(file);

console.log('Write your text, please');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
     exit();
  };
  stream.write(data);
});

process.on('exit', () => console.log("File has been created")); 
