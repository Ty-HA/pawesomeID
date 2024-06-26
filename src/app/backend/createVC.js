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

// Function to create and sign a Verifiable Credential (VC) for your pet "Wiwi"
async function createAndSignVC(
  didIssuer,
  didUser,
  privateKeyIssuerForAssertion,
  petProfile
) {
  const vc = {
    "@context": "https://www.w3.org/2018/credentials/v1",
    type: ["VerifiableCredential"],
    issuer: didIssuer,
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: didUser,
      credential: {
        type: "Passport",
        name: "Pawesome Passport ID",
      },
      pet: petProfile,
    },
  };

  try {
    const vcString = JSON.stringify(vc);
    const signature = signData(vcString, privateKeyIssuerForAssertion);
    vc["proof"] = {
      type: "EcdsaSecp256k1RecoveryMethod2020",
      created: new Date().toISOString(),
      proofPurpose: "assertionMethod",
      verificationMethod: didIssuer + "#keys-1",
      signatureValue: signature,
    };
    return vc;
  } catch (error) {
    console.error("Error during VC creation and signing:", error);
    return null;
  }
}

// Function to submit CredentialCreate transaction to XRPL
async function submitCredentialCreate(vc) {
  try {
    const wallet = xrpl.Wallet.fromSeed(issuerPrivateKey);
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect(); // Testnet endpoint

    // Manually construct the CredentialCreate transaction object
    const credentialCreateTx = {
      TransactionType: "CredentialCreate",
      Account: wallet.address,
      Subject: vc.credentialSubject.id,
      CredentialType: 1,

      // Add other required fields for CredentialCreate transaction here
      // For example, you might need to include fields like `Target`, `Amount`, etc., based on the amendment details
    };

    // Check if the prepareCreateCredential method exists
    if (typeof client.prepareCreateCredential === "function") {
      // const tx = await client.prepareCreateCredential(wallet, vc);
      const signedTx = wallet.signTransaction(credentialCreateTx);
      const txResponse = await client.submitTransaction(signedTx);
      console.log("Transaction Submitted. Result:", txResponse);
    } else {
      console.error(
        "The method prepareCreateCredential does not exist. You may need to manually prepare the transaction or update the xrpl library."
      );
    }
  } catch (error) {
    console.error("Error submitting CredentialCreate transaction:", error);
  }
}

// Function to submit CredentialCreate transaction to XRPL
async function submitCredentialAccept(vc) {
    try {
      const wallet = xrpl.Wallet.fromSeed(issuerPrivateKey);
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
      await client.connect(); // Testnet endpoint
  
      // Manually construct the CredentialCreate transaction object
      const credentialAcceptTx = {
        TransactionType: "CredentialAccept",
        Account: vc.credentialSubject.id,
        Issuer: wallet.address, 
        CredentialType: 1,
  
        // Add other required fields for CredentialCreate transaction here
        // For example, you might need to include fields like `Target`, `Amount`, etc., based on the amendment details
      };
  
      // Check if the prepareCreateCredential method exists
      if (typeof client.prepareAcceptCredential === "function") {
        // const tx = await client.prepareCreateCredential(wallet, vc);
        const signedTx = wallet.signTransaction(credentialAcceptTx);
        const txResponse = await client.submitTransaction(signedTx);
        console.log("Transaction Submitted. Result:", txResponse);
      } else {
        console.error(
          "The method prepareAcceptCredential does not exist. You may need to manually prepare the transaction or update the xrpl library."
        );
      }
    } catch (error) {
      console.error("Error submitting CredentialCreate transaction:", error);
    }
  }
  

// Main function to create, sign, and submit a Verifiable Credential (VC) for your pet "Wiwi"
async function main() {
  const userDID = "did:xrpl:1:rDm3i9buZ76gZe8oPmGDzn7x4UUfyhYn3h";
  const issuerDID = "did:xrpl:1:r9UVfG5LnWNMaCyHLWBHhrT37jUiuQ2azE";

  const petProfile = {
    Owner: "Ty",
    Name: "Bunny",
    Species: "Dog",
    Breed: "Finnish Lapphund",
    Sex: "F",
    Birthdate: "2012-06-07",
    Origin: "FRA",
    Coat: "Grey Domino",
    EyesColor: "Brown",
    Microchip: "2500269604711389FRA",
    PedigreeNumber: "123456",
    IdIssueDate: "2024-06-18",
  };

  const vc = await createAndSignVC(
    issuerDID,
    userDID,
    issuerPrivateKey,
    petProfile
  );
  console.log(JSON.stringify(vc, null, 2));

  if (vc) {
    await submitCredentialCreate(vc);
    await submitCredentialAccept(vc);
    console.log(
      chalk.green("CredentialCreate transaction submitted successfully.")
    );
  } else {
    console.log(chalk.red("Failed to create and sign Verifiable Credential."));
  }
}

main();
