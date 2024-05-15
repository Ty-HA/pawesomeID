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

fetchFile('018f3a4ad989db9ee87e38da543648e9d41a4a55354dc754c98ccc9a0ce09177')
  .then(content => console.log(content))
  .catch(error => console.error(error));