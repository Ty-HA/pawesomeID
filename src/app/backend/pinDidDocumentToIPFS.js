const axios = require("axios");
const chalk = require('chalk');

const FormData = require("form-data");
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYTFlOWQzNC1hNTUzLTRhN2EtODI2NS05OTMyMmFjYzU5YzIiLCJlbWFpbCI6Imd1aWxsYXVtZUB4cnBsLWNvbW1vbnMub3JnIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRiYTE3NjY4MDQzMGFkMzY4MDJkIiwic2NvcGVkS2V5U2VjcmV0IjoiMWJmNmY0OGI5MjE1Y2Y5YWQ4N2MyZGQxOWYxNGMwM2E5YjRiNzY1MTdmNDkzY2NkMTI3Y2UxNmMwZDg1YTA1NCIsImlhdCI6MTcxNDgzMDI2OX0.uiVlk-mRDsktFNYjz1TVMiiqQ1UIhlRYDgMDvn-Z7L4";

  const did= `did:xrpl:1:rBvPGAgiBQWeFz8MwXmXi3TLqptUf9ViFe`;
  const uri = 'https://crimson-active-cuckoo-676.mypinata.cloud/ipfs/QmPSTEyKsW1RzUrEWfFAQijUhCgV2LSr6qB9xPaY41X7Tk';
  const PK = 'EDCF22D7540A07F07D7D006AC738A7544CABF669B24099E5B31E9BE6FBC631016B'
  
  const didDocument = {
    "@context": "https://www.w3.org/ns/did/v1",
    id: did,
    controller: did,
    verificationMethod: [
      {
        id: `${did}#keys-1`,
        type: "EcdsaSecp256k1RecoveryMethod2020",
        controller: did,
        publicKeyHex: PK,
      },
    ],
    service: [
      {
        id: `${did}#profile`,
        type: "Public Profile",
        serviceEndpoint: uri,
      },
    ],
  };

const pinDidDocumentToIPFS = async (didDocument) => {
  console.log(chalk.green("didDocument from pinFile: ", JSON.stringify(didDocument, null, 2)));

  if (!didDocument) {
    console.error("didDocument is undefined");
    return;
  }
  
  const formData = new FormData();

  const jsonData = JSON.stringify(didDocument);

  const jsonBuffer = Buffer.from(jsonData, "utf-8");

  // Append the Buffer as a file to FormData
  formData.append("file", jsonBuffer, {
    filename: "didDocument.json",
    contentType: "application/json",
  });

  formData.append(
    "pinataOptions",
    JSON.stringify({
      cidVersion: 0,
    })
  );

  // Setting headers, include FormData's headers to handle the boundary
  const headers = {
    Authorization: "Bearer " + JWT,
    ...formData.getHeaders(),
  };

  try {
    // Send the POST request
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: headers,
      }
    );
    // console.log("responseData", response.data);
    //return await fetchFileFromIPFS(response.data.IpfsHash);
    // console.log("responseDataIpfsHash", response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error(error);
  }
  //return await fetchFileFromIPFS(response.data.IpfsHash);
  return response.data.IpfsHash;
};


async function fetchFileFromIPFS(didDocument) {
  const ipfsHash = await pinDidDocumentToIPFS(didDocument);
  const url = `https://crimson-active-cuckoo-676.mypinata.cloud/ipfs/${ipfsHash}`;
  console.log(chalk.yellow("url from fetchFile:", url));
  const hexUrl = Buffer.from(url).toString("hex");
  console.log(chalk.yellow("TEST hexUrl from fetchFile:", hexUrl));
  const pinataIPFSlink = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  console.log(chalk.yellow("pinataIPFSlink from fetchFile:", pinataIPFSlink));

  try {
    const response = await axios.get(url);
    console.log(chalk.yellow('Response data:', response.data));
    let data = response.data;
    console.log("Fetched data from IPFS from pinFile:", data);
  } catch (error) {
    console.error("Error fetching file from IPFS:", error);
  }
  return hexUrl;
}

pinDidDocumentToIPFS(didDocument);
fetchFileFromIPFS(didDocument);
module.exports = { fetchFileFromIPFS, pinDidDocumentToIPFS };
