const xrpl = require("xrpl");
const { ec: EC } = require("elliptic");
const ec = new EC("secp256k1");
const chalk = require("chalk");

// Issuer information
const issuerDid = "did:xrpl:1:r9UVfG5LnWNMaCyHLWBHhrT37jUiuQ2azE";
const issuerPrivateKey = "sEd7zMpi74XGJzs2Emb59XkhPukoHPp";

// Function to sign data with a private key
function signData(data, privateKey) {
    const key = ec.keyFromPrivate(privateKey, "hex");
    const signature = key.sign(data);
    const derSign = signature.toDER("hex");
    return derSign;
  }

  // Define the credential details
const credentialDetails = {
    subject: "Pawesome Passport", // Example subject DID
    issuer: issuerDid, // Issuer DID from the variable defined above
    credentialType: 1, // Example credential type identifier
    expiration: 0, // Optional expiration, 0 means no expiration
    uri: "https://gateway.pinata.cloud/ipfs/QmZSr6uRdYx7GtWNUACqTiRcF2n4rVCN8zoJNiEcvQ6vSU" // Optional URI for additional credential data
  };

  async function createCredentialOnLedger(issuerPrivateKey, credentialDetails) {
    try {
      const wallet = xrpl.Wallet.fromSeed(issuerPrivateKey);
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();
  
      const credentialTx = {
        TransactionType: "CredentialCreate", // Hypothetical transaction type
        Account: wallet.address,
        LedgerEntryType: "Credential",
        Flags: 0, // Specify any necessary flags
        Subject: credentialDetails.subject,
        Issuer: wallet.address,
        CredentialType: credentialDetails.credentialType,
        Expiration: credentialDetails.expiration || 0,
        URI: credentialDetails.uri || "",
        OwnerNode: "0", // This would be determined dynamically in a real scenario
        PreviousTxnID: "0", // This would be determined dynamically
        PreviousTxnLgrSeqNumber: 0 // This would be determined dynamically
      };
  
      const signedTx = wallet.sign(credentialTx);
      const txResponse = await client.submitTransaction(signedTx);
      console.log("Transaction Submitted. Result:", txResponse);
    } catch (error) {
      console.error("Error during Credential creation on XRPL:", error);
    }
  }

  async function main() {
    try {
      // Call the createCredentialOnLedger function with the issuer's private key and the credential details
      await createCredentialOnLedger(issuerPrivateKey, credentialDetails);
    } catch (error) {
      console.error(chalk.red("Failed to create credential on ledger:"), error);
    } finally {
      // Assuming the client is accessible here, disconnect from the XRPL network
      // This might require moving the client to a higher scope or managing connection state differently
      // client.disconnect(); // Uncomment and adjust based on actual client scope
      console.log(chalk.green("Disconnected from XRPL network."));
    }
  }
  
  // Execute the main function
  main();