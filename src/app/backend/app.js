const express = require('express');
const cors = require('cors');
const { fetchFileFromIPFS, pinFileToIPFS } = require('./pinFileToIPFS.js');
const writeDIDToXRPL = require('./writeDIDToXRPL.js');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.post('/pinFileToIPFS', async (req, res) => {
  const petData = req.body;
  if (!petData) {
    return res.status(400).json({ error: 'Missing pet data' });
  }
  try {
    const ipfsHash = await pinFileToIPFS(petData);
    if (!ipfsHash) {
      return res.status(500).json({ error: 'Failed to pin file to IPFS' });
    }
    res.json({ ipfsHash });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/writeDIDToXRPL', async (req, res) => {
  try {
    await writeDIDToXRPL();
    res.json({ message: 'DID written to XRPL' });
  } catch (error) {
    console.error('Error in /writeDIDToXRPL:', error);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(8080, () => console.log('Server listening on port 8080'));