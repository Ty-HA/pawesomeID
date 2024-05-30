require("dotenv").config();

const { Client, Wallet } = require("xrpl");
const EthereumUtil = require("ethereumjs-util");

const chalk = require("chalk");

const { fetchFileFromIPFS } = require("./pinFileToIPFS.js");
const crypto = require("crypto");

/*
const petData = "your petData json here"

fetchFileFromIPFS(petData)
  .then(hexUrl => console.log(hexUrl))
  */

async function fetchPetData(petData) {
  // Convert petData to a string and hash it
  console.log("petData retrieved from app.js:", petData);
  const petDataString = JSON.stringify(petData);
  const petDataHash = crypto
    .createHash("sha256")
    .update(petDataString)
    .digest("hex");
  console.log("petDataHash:", petDataHash);

  if (!petDataHash) {
    throw new Error("Failed to compute petData hash");
  }

  // Use petDataHash here
  fetchFileFromIPFS(petDataHash)
    .then((hexUrl) => console.log(hexUrl))
    .then((ipfsLink) => console.log(ipfsLink))
    // handle errors
    .catch((error) => console.error(error));

  return petDataHash;
}

const prefixPinata = "https://gateway.pinata.cloud/ipfs/";

// Generates a wallet using a given secret
async function generateWalletFromSecret(secret) {
  const wallet = Wallet.fromSecret(secret);
  console.log("Wallet from generateWalletSecret:", wallet);
  // console.log("Wallet publicKey:", wallet.publicKey);
  console.log("Wallet address:", wallet.address);
  return wallet;
}
// Sets a DID document on the XRP Ledger
async function setDID(wallet, petDataHash, uri) {
  
  console.log(chalk.green("wallet.publicKey:", wallet.publicKey)); 
  console.log("petDataHash:", petDataHash);
  console.log("uri:", uri);

  const client = new Client("wss://s.devnet.rippletest.net:51233/");
  await client.connect();
  const ipfsURI = uri;
  console.log("ipfsURI from setDID:", ipfsURI);
  const hexUrl = Buffer.from(ipfsURI).toString("hex");

  const did = `did:xrpl:1:${wallet.address}`;
  console.log(chalk.yellow("DID:", did));

  const PK = wallet.publicKey;
  

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

  console.log("DID Document:", didDocument);

  const didDocumentString = JSON.stringify(didDocument);
  console.log("DID Document String:", didDocumentString);
  
  // TO DO: put DIDDoc on IPFS
  

  try {
    const prepared = await client.autofill({
      TransactionType: "DIDSet",
      Account: wallet.address,
      // DIDDocument: didDocumentBlob,
      Data: hexUrl,
      // NetworkID: 140002, //The network ID of the network to which this transaction is submitted.      
      URI: hexUrl,
      SigningPubKey: PK,
      
    });

    console.log("Prepared:", prepared);

    let signedTransaction = wallet.sign(prepared);

    const result = await client.submitAndWait(signedTransaction.tx_blob);
    // console.log(chalk.blue(`Transaction result: ${JSON.stringify(result, null, 2)}`));
    return result;
  } catch (error) {
    console.error(chalk.red(`Error setting DID: ${error}`));
    return null;
  } finally {
    await client.disconnect();
  }
}

// Main function for wallet creation and DID setting on the XRP Ledger
async function writeDIDToXRPL(petData, uri) {
  try {
    const issuerSecret = "sEdVNQpbEszgeoRPe4o1pvnvqVqvGBf";
    let issuerWallet = await generateWalletFromSecret(issuerSecret);
    // console.log('Issuer wallet:', issuerWallet);

    //let issuerDIDIpfsHash = "408db59992f378af39e7c4ddc7a96ace826f9475e564ff3e4bfd9d72ee0e667e";
    const issuerPetPetDataHash = await fetchPetData(petData);
    // console.log('issuerPetPetDataHash:', issuerPetPetDataHash);
    // console.log('uri:', uri);
    const issuerResult = await setDID(issuerWallet, issuerPetPetDataHash, uri);
    // console.log(chalk.blue(`Issuer Transaction result: ${JSON.stringify(issuerResult, null, 2)}`));

    const userSecret = "sEdToEk5mVUqxTq7bS5zbBK7PXLDbsp";
    let userWallet = await generateWalletFromSecret(userSecret);
    //let userDIDIpfsHash = "dffafde488960b37a54f648889e2aa4d493a609f4a078cc96780a53da3811793";

    const userPetPetDataHash = await fetchPetData(petData);
    const userResult = await setDID(userWallet, userPetPetDataHash, uri);
    // console.log(chalk.blue(`User Transaction result: ${JSON.stringify(userResult, null, 2)}`));

    return { issuerTx: issuerResult?.tx?.hash, userTx: userResult?.tx?.hash };
  } catch (error) {
    console.error(chalk.red(`Error writing DID to XRPL: ${error}`));
    return null;
  }
}

// Run the main function and handle any exceptions
// writeDIDToXRPL().catch(error => console.error(chalk.redBright(`Critical error encountered: ${error}`)));

module.exports = {
  writeDIDToXRPL,
  fetchPetData,
  generateWalletFromSecret,
  setDID,
};
