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


const hex = '68747470733A2F2F6372696D736F6E2D6163746976652D6375636B6F6F2D3637362E6D7970696E6174612E636C6F75642F697066732F516D556255413434766E654E354C74486E587A50664B466D57453277456B546A7776784B7A385752727956696171';
const str = Buffer.from(hex, 'hex').toString('utf8');
console.log(chalk.yellow(str));
// test