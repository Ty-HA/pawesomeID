const axios = require("axios");
const chalk = require('chalk');

const FormData = require("form-data");

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZjE1MTkzYS1kMzRkLTQxYWMtYjMxMy01NzcyYWIyZjVlNjUiLCJlbWFpbCI6ImJpY2h0eS5oYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWExZjJhZWVjZWE4ODdlNTk4NDQiLCJzY29wZWRLZXlTZWNyZXQiOiI1N2E4MGQyMzUxNDQ1ZjNmYWY3ZmMzYzM1NWZlNTU0M2JiYjUxYWEzNGQyZjdmNzQ1YzZhYTEzNTU4NDlmZTNjIiwiaWF0IjoxNzE3MDg3MTMzfQ.i8Ofn3R7nm2xyJrODuyDJu-xz3h7b_t4EfEUvCBBoH0";

  const did= `did:xrpl:1:rBvPGAgiBQWeFz8MwXmXi3TLqptUf9ViFe`;
  const uri = 'https://gateway.pinata.cloud/ipfs/QmXGespe6ikmFMDVcwwqTU8R12QUEFJ7kdM9AZooF38H63';
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
