// Import the function from the module
const { pinFileToIPFS } = require('./pinFileToIPFS');

// Define some test data
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
    console.log('Returned hexUrl:', hexUrl);
    console.log(`https://crimson-active-cuckoo-676.mypinata.cloud/ipfs/${hexUrl}`);
  })
  .catch(error => console.error('Error:', error));


  const hex = '68747470733a2f2f6372696d736f6e2d6163746976652d6375636b6f6f2d3637362e6d7970696e6174612e636c6f75642f697066732f516d62644e4344487a695578776a524645786f66384e77547831623934347665695550626752715a314576577a47';
const str = Buffer.from(hex, 'hex').toString('utf8');
console.log(str);