const express = require('express');
const cors = require('cors');
const { fetchFileFromIPFS, pinFileToIPFS } = require('./pinFileToIPFS.js');

const {writeDIDToXRPL, setDID} = require('./writeDIDToXRPL.js');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.post('/pinFileToIPFS', async (req, res) => {
  const petData = req.body;
  // console.log('petData reqBody:', petData);
  if (!petData) {
    return res.status(400).json({ error: 'Missing pet data' });
  }
  try {
    const hexUrl = await pinFileToIPFS(petData);
    console.log('Returned hexUrl from app.js:', hexUrl);
    const URI = `https://crimson-active-cuckoo-676.mypinata.cloud/ipfs/${hexUrl}`;
    console.log("uri", URI);
    
    // const ipfsHash = Buffer.from(hexUrl, 'hex').toString('utf8');
    // console.log('hexUrl converted into ipfsHash:', ipfsHash);
    res.json( petData );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.toString() });
  }
});


app.get('/fetchFileFromIPFS', async (req, res) => {
  const ipfsHash = req.query.ipfsHash;
  console.log('ipfsHash reqQuery:', ipfsHash);
  if (!ipfsHash) {
    return res.status(400).json({ error: 'Missing IPFS hash' });
  }
  try {
    const hexUrl = await fetchFileFromIPFS(ipfsHash);
    if (!hexUrl) {
      return res.status(500).json({ error: 'Failed to fetch file from IPFS' });
    }
    res.json({ hexUrl });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/writeDIDToXRPL', async (req, res) => {
  try {
    const petData = req.body;
    
    if (!petData) {
      return res.status(400).json({ error: 'Missing IPFS hash' });
    }
    const hexUrl = await pinFileToIPFS(petData);
    console.log('Returned hexUrl from app.js:', hexUrl);
    const URI = `https://crimson-active-cuckoo-676.mypinata.cloud/ipfs/${hexUrl}`;
    console.log("uri", URI);

    await writeDIDToXRPL(petData, URI); // Pass the IPFS hash to the writeDIDToXRPL function

    res.json({ message: 'DID written to XRPL' });
  } catch (error) {
    console.error('Error in /writeDIDToXRPL:', error);
    res.status(500).json({ error: error.toString() });
  }
});


app.listen(8080, () => console.log('Server listening on port 8080'));