const IPFS = require('ipfs-http-client');

const ipfs = IPFS.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function fetchFile(hash) {
  const data = [];
  for await (const file of ipfs.get(hash)) {
    for await (const chunk of file.content) {
      data.push(chunk);
    }
  }
  return Buffer.concat(data).toString();
}

fetchFile('408DB59992F378AF39E7C4DDC7A96ACE826F9475E564FF3E4BFD9D72EE0E667E')
  .then(content => console.log(content))
  .catch(error => console.error(error));