const axios = require("axios");
const FormData = require("form-data");
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYTFlOWQzNC1hNTUzLTRhN2EtODI2NS05OTMyMmFjYzU5YzIiLCJlbWFpbCI6Imd1aWxsYXVtZUB4cnBsLWNvbW1vbnMub3JnIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjRiYTE3NjY4MDQzMGFkMzY4MDJkIiwic2NvcGVkS2V5U2VjcmV0IjoiMWJmNmY0OGI5MjE1Y2Y5YWQ4N2MyZGQxOWYxNGMwM2E5YjRiNzY1MTdmNDkzY2NkMTI3Y2UxNmMwZDg1YTA1NCIsImlhdCI6MTcxNDgzMDI2OX0.uiVlk-mRDsktFNYjz1TVMiiqQ1UIhlRYDgMDvn-Z7L4";

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const jsonData = JSON.stringify({ //This is where we put the animal's characteristics
    Name: "BUNNY",
    Species: "dogwifhat",
    Breed: "Dog",
    Sex: "male",
    Birthdate: "2023-20-11",
    Coat: "Brown"
  });
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
    }),
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
      },
    );
    //console.log(response.data);
    //return await fetchFileFromIPFS(response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error(error);
  }
  //return await fetchFileFromIPFS(response.data.IpfsHash);
  return response.data.IpfsHash;
};

async function fetchFileFromIPFS() {
const ipfsHash = await pinFileToIPFS();
//console.log(ipfsHash)
  const url = `https://crimson-active-cuckoo-676.mypinata.cloud/ipfs/${ipfsHash}`;
  const hexUrl = Buffer.from(url).toString('hex');
  try {
    const response = await axios.get(url);
    console.log("Fetched from IPFS:", response.data);
  } catch (error) {
    console.error("Error fetching file from IPFS:", error);
  }
  return hexUrl;
}
module.exports = pinFileToIPFS;

module.exports = fetchFileFromIPFS;
//pinFileToIPFS();
