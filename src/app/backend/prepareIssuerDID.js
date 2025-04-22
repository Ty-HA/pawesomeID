// When a professional login for the first time, we need to prepare the issuer DID for the professional
const xrpl = require('xrpl');
const axios = require('axios');
const chalk = require('chalk');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const bs58 = require('bs58');
require('dotenv').config();

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZjE1MTkzYS1kMzRkLTQxYWMtYjMxMy01NzcyYWIyZjVlNjUiLCJlbWFpbCI6ImJpY2h0eS5oYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWExZjJhZWVjZWE4ODdlNTk4NDQiLCJzY29wZWRLZXlTZWNyZXQiOiI1N2E4MGQyMzUxNDQ1ZjNmYWY3ZmMzYzM1NWZlNTU0M2JiYjUxYWEzNGQyZjdmNzQ1YzZhYTEzNTU4NDlmZTNjIiwiaWF0IjoxNzE3MDg3MTMzfQ.i8Ofn3R7nm2xyJrODuyDJu-xz3h7b_t4EfEUvCBBoH0";


// Configuration for API keys and creating a custom axios instance for Pinata Cloud interactions
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
const pinataAxios = axios.create({
  baseURL: 'https://api.pinata.cloud/',
  headers: {
      'Authorization': `Bearer ${JWT}`,
      'pinata_api_key': pinataApiKey,
      'pinata_secret_api_key': pinataSecretApiKey
  }
});
const prefixPinata = "https://gateway.pinata.cloud/ipfs/";

// Generates a wallet using a secret
async function generateWalletFromSecret(secret) {
    const wallet = xrpl.Wallet.fromSecret(secret);
    return wallet;
}

// Uploads JSON data to IPFS using the Pinata service
async function uploadJSONToIPFS(data) {
    try {
        const response = await pinataAxios.post('pinning/pinJSONToIPFS', data);
        return response.data.IpfsHash;
    } catch (error) {
        console.log(chalk.red('Error uploading JSON to IPFS:'), chalk.white.bgRed(error.message));
        return null;
    }
}

// Creates a Digital Identity Document (DID) and uploads it to IPFS
async function createDID(issuerWallet, publicKeyForAssertion) {
    // Vet Clinic DID
    const did = `did:xrpl:1:${issuerWallet.address}`;
    const profile = {
      "type": "Issuer Vet Profile",
      "name": "Veterinary Pawesome",
      "sector": "Veterinary Services",
      "description": "A veterinary clinic that provides medical care for pets and animals.",
      "website": "https://pawesomevet.com/",
      "email": "vet@pawesomevet.com"
      // "profileImage": "https://myntfsid.mypinata.cloud/ipfs/QmTAS5uk94NUvrgJCBu7bWoaVXkmj2Zaf6pg5JA32YMHMV"
    };

    const profileIPFSLink = await uploadJSONToIPFS(profile);
    if (!profileIPFSLink) {
        console.log(chalk.red('Failed to upload profile to IPFS. Aborting DID creation.'));
        return null;
    }

    // DID Document structure
    // id is the Vet Clinic DID
    // Controller is also the clinic, it could be a veterinarian did
    const didDocument = {
      "@context": "https://www.w3.org/ns/did/v1",
      "id": did,
      "controller": did,
      "verificationMethod": [{
        "id": `${did}#keys-1`,
        "type": "EcdsaSecp256k1RecoveryMethod2020",
        "controller": did,
        "publicKeyHex": publicKeyForAssertion
      }],
      "service": [{
        "id": `${did}#profile`,
        "type": "Public Profile",
        "serviceEndpoint": prefixPinata + profileIPFSLink
      }]
    };

    const didIPFSLink = await uploadJSONToIPFS(didDocument);
    const buffer = bs58.decode(didIPFSLink);
    const fullHexString = buffer.toString('hex');
    let hexCID = fullHexString.substring(4);

    // Displaying operation details in a structured format with emojis and colored text
    console.log(chalk.green("🌟 Summary of Operations Performed:"));
    console.log(chalk.blue(`🔹 Unique Issuer DID Generated: ${did}`));
    console.log(chalk.yellow("📄 Detailed View of the DID Document:"));
    console.log(chalk.yellow(JSON.stringify(didDocument, null, 2)));
    console.log(chalk.blue(`🔗 Direct Link to DID Document on IPFS: ${prefixPinata + didIPFSLink}`));
    console.log(chalk.blue(`🔖 CID of the IPFS Content: ${hexCID}`));

    return prefixPinata + didIPFSLink;
}

// Main function to execute the DID creation process
async function main() {
    // const issuerSecret = "sEdVRT1xCf2tFTzgbG9KR1G57us8SKH";
    // let publicKeyForAssertion = '0307248CE83C5301FAE84428730FA46A97F10F75784F633BBCD912C60973D7F2DA';

    const issuerSecret = "sEd7zMpi74XGJzs2Emb59XkhPukoHPp";

    // Generate wallet and create DID
    let issuerWallet = await generateWalletFromSecret(issuerSecret);
     // Assuming generateWalletFromSecret returns an object that includes publicKey
    let issuerPublicKeyForAssertion = issuerWallet.publicKey;
    await createDID(issuerWallet, issuerPublicKeyForAssertion);
}

// Run the main function
main();
