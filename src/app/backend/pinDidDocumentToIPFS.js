const axios = require("axios");
const chalk = require('chalk');

const FormData = require("form-data");

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZjE1MTkzYS1kMzRkLTQxYWMtYjMxMy01NzcyYWIyZjVlNjUiLCJlbWFpbCI6ImJpY2h0eS5oYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWExZjJhZWVjZWE4ODdlNTk4NDQiLCJzY29wZWRLZXlTZWNyZXQiOiI1N2E4MGQyMzUxNDQ1ZjNmYWY3ZmMzYzM1NWZlNTU0M2JiYjUxYWEzNGQyZjdmNzQ1YzZhYTEzNTU4NDlmZTNjIiwiaWF0IjoxNzE3MDg3MTMzfQ.i8Ofn3R7nm2xyJrODuyDJu-xz3h7b_t4EfEUvCBBoH0";

  const did= `did:xrpl:1:r9UVfG5LnWNMaCyHLWBHhrT37jUiuQ2azE`;
  // endpoint with PetProfile
  const uri = 'https://gateway.pinata.cloud/ipfs/QmZSr6uRdYx7GtWNUACqTiRcF2n4rVCN8zoJNiEcvQ6vSU';
  const PK = 'EDC6CAF48E5A0F55B124136E4ABF723F965C50B6E5DCB5B47E44FD2230F6971562'

  const userDid = `did:xrpl:1:rDm3i9buZ76gZe8oPmGDzn7x4UUfyhYn3h`;

  // The vet conrols the DID, id and controller = IssuerDID
  
  const didDocument = {
    "@context": "https://www.w3.org/ns/did/v1",
    id: did,
    controller: userDid,
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
  const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
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
