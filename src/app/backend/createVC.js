// VC CREATED BY ISSUER
const xrpl = require('xrpl');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const chalk = require('chalk');

// Issuer information
const issuerDid = 'did:xrpl:1:r9UVfG5LnWNMaCyHLWBHhrT37jUiuQ2azE';
const issuerPrivateKey = 'sEd7zMpi74XGJzs2Emb59XkhPukoHPp';

// Function to sign data with a private key
function signData(data, privateKey) {
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const signature = key.sign(data);
    const derSign = signature.toDER('hex');
    return derSign;
}

// Function to create and sign a Verifiable Credential (VC) for your pet "Wiwi"
async function createAndSignVC(didIssuer, didUser, privateKeyIssuerForAssertion, petProfile) {
    const vc = {
        "@context": "https://www.w3.org/2018/credentials/v1",
        "type": ["VerifiableCredential"],
        "issuer": didIssuer,
        "issuanceDate": new Date().toISOString(),
        "credentialSubject": {
            "id": didUser,
            "credential": {
                "type": "Passport",
                "name": "Pawesome Passport ID"
            },
            "pet": petProfile
        }
    };

    try {
        const vcString = JSON.stringify(vc);
        const signature = signData(vcString, privateKeyIssuerForAssertion);
        vc['proof'] = {
            "type": "EcdsaSecp256k1RecoveryMethod2020",
            "created": new Date().toISOString(),
            "proofPurpose": "assertionMethod",
            "verificationMethod": didIssuer + '#keys-1',
            "signature": signature
        };
        return vc;
    } catch (error) {
        console.error("Error during VC creation and signing:", error);
        return null;
    }
}

// Main function to create and sign a Verifiable Credential (VC) for your pet "Wiwi"
async function main() {
    const userDID = "did:xrpl:1:rDm3i9buZ76gZe8oPmGDzn7x4UUfyhYn3h";
    const issuerDID = "did:xrpl:1:r9UVfG5LnWNMaCyHLWBHhrT37jUiuQ2azE";
    const issuerPrivateKeyForAssertion = '0041A2F8C0D2CAFC0E2DDC6BD490F047B091FD6F2BEFA942E59C8AFEED91235667';

    const petProfile = {
        "Owner": "Ty",
        "Name": "Bunny",
        "Species": "Dog",
        "Breed": "Finnish Lapphund",
        "Sex": "F",
        "Birthdate": "2012-06-07",
        "Origin": "FRA",
        "Coat": "Grey Domino",
        "EyesColor": "Brown",
        "Microchip": "2500269604711389FRA",
        "PedigreeNumber": "123456",
        "IdIssueDate": "2024-06-18"
      }

    const vc = await createAndSignVC(issuerDID, userDID, issuerPrivateKeyForAssertion, petProfile);
    console.log(JSON.stringify(vc, null, 2));
    console.log(chalk.green("create VC ok"));
}

main();
