const xrpl = require('xrpl');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Function to sign data with a private key
function signData(data, privateKey) {
    // Create a key object from the private key in hexadecimal format
    const key = ec.keyFromPrivate(privateKey, 'hex');
    // Sign the data and return the signature in DER hexadecimal format
    const signature = key.sign(data);
    const derSign = signature.toDER('hex');
    return derSign;
}

// Function to create and sign a Verifiable Credential (VC)
async function createAndSignVC(didIssuer, didUser, privateKeyIssuerForAssertion) {
    // Define a verifiable credential with the subject details and issuance metadata
    const vc = {
        "context": "https://www.w3.org/2018/credentials/v1",
        "type": ["VerifiableCredential"],
        "issuer": didIssuer,
        "issuanceDate": new Date().toISOString(),
        "credentialSubject": {
            "id": didUser,
            "degree": {
                "type": "MasterDegree",
                "name": "Computer Science"
            }
        }
    };

    try {
        // Serialize the VC to a string to prepare for signing
        const vcString = JSON.stringify(vc);
        // Sign the serialized VC
        const signature = signData(vcString, privateKeyIssuerForAssertion);
        // Attach the cryptographic proof to the VC
        vc['proof'] = {
            "type": "EcdsaSecp256k1RecoveryMethod2020",
            "created": new Date().toISOString(),
            "proofPurpose": "assertionMethod",
            "verificationMethod": didIssuer + '#keys-1',
            "signature": signature
        };
        return vc;
    } catch (error) {
        // Handle errors that may occur during the creation or signing process
        console.error("Error during VC creation and signing:", error);
        return null;
    }
}

// Main function to demonstrate the usage of the createAndSignVC function
async function main() {
    const userDID = "did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ";
    const issuerDID = "did:xrpl:1:rffGVvdyzRxT1KJLs6K4ZaNj5LiDJGxNvu";
    let issuerPrivateKeyForAssertion = '0041A2F8C0D2CAFC0E2DDC6BD490F047B091FD6F2BEFA942E59C8AFEED91235667';

    // Create and sign the VC using issuer and user information
    const vc = await createAndSignVC(issuerDID, userDID, issuerPrivateKeyForAssertion);
    // Output the completed and signed VC
    console.log(JSON.stringify(vc, null, 2));
}

main();
