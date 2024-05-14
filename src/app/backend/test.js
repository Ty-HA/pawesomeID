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
  .then(hexUrl => console.log('Returned hexUrl:', hexUrl))
  .catch(error => console.error('Error:', error));