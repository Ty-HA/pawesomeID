require("dotenv").config();

const { Client, Wallet } = require("xrpl");
const chalk = require("chalk");
const axios = require("axios");
const FormData = require("form-data");
const crypto = require("crypto");

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZjE1MTkzYS1kMzRkLTQxYWMtYjMxMy01NzcyYWIyZjVlNjUiLCJlbWFpbCI6ImJpY2h0eS5oYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWExZjJhZWVjZWE4ODdlNTk4NDQiLCJzY29wZWRLZXlTZWNyZXQiOiI1N2E4MGQyMzUxNDQ1ZjNmYWY3ZmMzYzM1NWZlNTU0M2JiYjUxYWEzNGQyZjdmNzQ1YzZhYTEzNTU4NDlmZTNjIiwiaWF0IjoxNzE3MDg3MTMzfQ.i8Ofn3R7nm2xyJrODuyDJu-xz3h7b_t4EfEUvCBBoH0";


async function fetchPetData(petData) {
  try {
    const petDataString = JSON.stringify(petData);
    const petDataHash = crypto.createHash("sha256").update(petDataString).digest("hex");
    console.log("Computed petDataHash:", petDataHash);
    return petDataHash;
  } catch (error) {
    console.error("Error fetching pet data:", error);
    throw error;
  }
}

async function generateWalletFromSecret(secret) {
  try {
    const wallet = Wallet.fromSecret(secret);
    console.log("Generated Wallet:", wallet);
    console.log("Wallet address:", wallet.address);
    return wallet;
  } catch (error) {
    console.error("Error generating wallet:", error);
    throw error;
  }
}

async function pinDidDocumentToIPFS(didDocument) {
  try {
    console.log(chalk.green("didDocument from pinFile:", JSON.stringify(didDocument, null, 2)));

    if (!didDocument) {
      throw new Error("didDocument is undefined");
    }

    const formData = new FormData();
    const jsonData = JSON.stringify(didDocument);
    const jsonBuffer = Buffer.from(jsonData, "utf-8");

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

    const headers = {
      Authorization: "Bearer " + JWT, 
      ...formData.getHeaders(),
    };

    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: headers,
    });

    console.log("IPFS Pin Response:", response.data);

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error pinning DID document to IPFS:", error);
    throw error;
  }
}

async function setDID(wallet, petDataHash, uri) {
  let client;
  try {
    console.log(chalk.green("wallet.publicKey:", wallet.publicKey));
    console.log("petDataHash:", petDataHash);
    console.log("uri:", uri);

    const client = new Client("wss://s.devnet.rippletest.net:51233/");
    await client.connect();

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

    const didDocumentHexUrl = Buffer.from(JSON.stringify(didDocument)).toString("hex");
    console.log("DID Document HexUrl:", didDocumentHexUrl);

    const ipfsHash = await pinDidDocumentToIPFS(didDocument);
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    const hexUrl = Buffer.from(ipfsUrl).toString("hex");

    console.log("IPFS URL:", ipfsUrl);
    console.log("Hex URL:", hexUrl);

   
    const prepared = await client.autofill({
      TransactionType: "DIDSet",
      Account: wallet.address,
      // DIDDocument: didDocumentHexUrl,
    // Data: hexUrl,
      URI: hexUrl,
      SigningPubKey: PK,
      // LastLedgerSequence: lastLedgerSequence,
    });

    console.log("Prepared Transaction:", prepared);
    console.log("Prepared Transaction bis:", JSON.stringify(prepared, null, 2));

    const signedTransaction = wallet.sign(prepared);
    const result = await client.submitAndWait(signedTransaction.tx_blob);

    console.log(chalk.green("Transaction result:", result));

    return result;
  } catch (error) {
    console.error(chalk.red("Error setting DID:", error));
    throw error;
  } finally {
    if (client) {
      await client.disconnect();
    }
  }
}

async function writeDIDToXRPL(petData, uri) {
  try {
    const issuerSecret = "sEd7zMpi74XGJzs2Emb59XkhPukoHPp";
    const issuerWallet = await generateWalletFromSecret(issuerSecret);
    const issuerPetDataHash = await fetchPetData(petData);
    const issuerResult = await setDID(issuerWallet, issuerPetDataHash, uri);

    const userSecret = "sEdSCyD96eVH9nK7jMAGkdTvx8AVgBD";
    const userWallet = await generateWalletFromSecret(userSecret);
    const userPetDataHash = await fetchPetData(petData);
    const userResult = await setDID(userWallet, userPetDataHash, uri);

    return { issuerTx: issuerResult?.tx?.hash, userTx: userResult?.tx?.hash };
  } catch (error) {
    console.error(chalk.red("Error writing DID to XRPL:", error));
    throw error;
  }
}

module.exports = {
  writeDIDToXRPL,
  fetchPetData,
  generateWalletFromSecret,
  setDID,
};
