// When a professional login for the first time, we need to prepare the issuer DID for the professional
const xrpl = require('xrpl');
const axios = require('axios');
const chalk = require('chalk');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const bs58 = require('bs58');

// Configuration for API keys and creating a custom axios instance for Pinata Cloud interactions
const pinataApiKey = 'your-private-key';
const pinataSecretApiKey = 'your-Secret-API-key';
const pinataAxios = axios.create({
  baseURL: 'https://api.pinata.cloud/',
  headers: {
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
    const did = `did:xrpl:1:${issuerWallet.address}`;
    const profile = {
      "type": "Issuer Profile",
      "name": "Veterinary Clinic",
      "sector": "Veterinary Services",
      "description": "A veterinary clinic that provides medical care for pets and animals.",
      "website": "https://mydid.com/",
      "email": "vet@test.io"
      // "profileImage": "https://myntfsid.mypinata.cloud/ipfs/QmTAS5uk94NUvrgJCBu7bWoaVXkmj2Zaf6pg5JA32YMHMV"
    };

    const profileIPFSLink = await uploadJSONToIPFS(profile);
    if (!profileIPFSLink) {
        console.log(chalk.red('Failed to upload profile to IPFS. Aborting DID creation.'));
        return null;
    }

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
    console.log(chalk.blue(`🔹 Unique User DID Generated: ${did}`));
    console.log(chalk.yellow("📄 Detailed View of the DID Document:"));
    console.log(chalk.yellow(JSON.stringify(didDocument, null, 2)));
    console.log(chalk.blue(`🔗 Direct Link to DID Document on IPFS: ${prefixPinata + didIPFSLink}`));
    console.log(chalk.blue(`🔖 CID of the IPFS Content: ${hexCID}`));

    return prefixPinata + didIPFSLink;
}

// Main function to execute the DID creation process
async function main() {
    const issuerSecret = "sEdVRT1xCf2tFTzgbG9KR1G57us8SKH";
    let publicKeyForAssertion = '0307248CE83C5301FAE84428730FA46A97F10F75784F633BBCD912C60973D7F2DA';

    // Generate wallet and create DID
    let issuerWallet = await generateWalletFromSecret(issuerSecret);
    await createDID(issuerWallet, publicKeyForAssertion);
}

// Run the main function
main();
