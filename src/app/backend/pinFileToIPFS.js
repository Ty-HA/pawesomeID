const axios = require("axios");
const chalk = require('chalk');

const FormData = require("form-data");
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYTFlOWQzNC1hNTUzLTRhN2EtODI2NS05OTMyMmFjYzU5YzIiLCJlbWFpbCI6Imd1aWxsYXVtZUB4cnBsLWNvbW1vbnMub3JnIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRiYTE3NjY4MDQzMGFkMzY4MDJkIiwic2NvcGVkS2V5U2VjcmV0IjoiMWJmNmY0OGI5MjE1Y2Y5YWQ4N2MyZGQxOWYxNGMwM2E5YjRiNzY1MTdmNDkzY2NkMTI3Y2UxNmMwZDg1YTA1NCIsImlhdCI6MTcxNDgzMDI2OX0.uiVlk-mRDsktFNYjz1TVMiiqQ1UIhlRYDgMDvn-Z7L4";

const pinFileToIPFS = async (petData) => {
  console.log(chalk.green("petData from pinFile: ", petData));

  if (!petData) {
    console.error("petData is undefined");
    return;
  }
  /*
  const jsonData = JSON.stringify({ 
    Name: "TEST",
    Species: "TEST",
    Breed: "Dog",
    Sex: "male",
    Birthdate: "2023-20-11",
    Coat: "TEST",
    PedigreeNumber: "123456",
  });

  const jsonBuffer = Buffer.from(jsonData, "utf-8");
*/
/*
  const jsonData = JSON.stringify(petData);

  console.log(chalk.green("jsonData from pinFile: ", jsonData));

  if (!jsonData) {
    console.error("jsonData is undefined");
    return;
  }

  const jsonBuffer = Buffer.from(jsonData, "utf-8");
  */

  const formData = new FormData();

  const jsonData = JSON.stringify(petData);

  const jsonBuffer = Buffer.from(jsonData, "utf-8");

  // Append the Buffer as a file to FormData
  formData.append("file", jsonBuffer, {
    filename: "Test.json",
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

async function fetchFileFromIPFS(petData) {
  const ipfsHash = await pinFileToIPFS(petData);
  //console.log(ipfsHash)
  const url = `https://crimson-active-cuckoo-676.mypinata.cloud/ipfs/${ipfsHash}`;
  const hexUrl = Buffer.from(url).toString("hex");
  console.log(chalk.yellow("TEST hexUrl from fetchFile:", hexUrl));
  const pinataIPFSlink = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  // .log("TEST data from IPFS from pinFile:", pinataIPFSlink);
  try {
    const response = await axios.get(url);
    console.log(chalk.yellow('Response data:', response.data));
    let data;
    if (typeof response.data === 'string') {
      data = JSON.parse(response.data);
    } else {
      data = response.data;
    }
    console.log("Fetched dataNAME from IPFS from pinFile:", data.Name);
    console.log("Fetched data from IPFS from pinFile:", response.data);
  } catch (error) {
    console.error("Error fetching file from IPFS:", error);
  }
  return hexUrl;
}
//pinFileToIPFS();
module.exports = { fetchFileFromIPFS, pinFileToIPFS };
