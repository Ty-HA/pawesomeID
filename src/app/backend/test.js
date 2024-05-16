// Import the function from the module
const { pinFileToIPFS } = require('./pinFileToIPFS');
const chalk = require('chalk');


// Define some test data
/*
const petData = {
  Name: "WidgetTEST",
  Species: "Dog",
  Breed: "chihuahua",
  Sex: "male",
  Birthdate: "2023-01-01",
  Coat: "Black and tan",
  PedigreeNumber: "00000"
};

// Call the function with the test data
pinFileToIPFS(petData)
  .then(hexUrl => {
    console.log(chalk.green('Returned hexUrl:', hexUrl));
    console.log(chalk.blue(`https://gateway.pinata.cloud/ipfs/${hexUrl}`));
  })
  .catch(error => console.error('Error:', error));
  */


const hex = '68747470733a2f2f6372696d736f6e2d6163746976652d6375636b6f6f2d3637362e6d7970696e6174612e636c6f75642f697066732f516d574a6366726f6a59387264726f35786568504d505131423456574b695a47386f75506169645433614a435446';
const str = Buffer.from(hex, 'hex').toString('utf8');
console.log(chalk.yellow(str));