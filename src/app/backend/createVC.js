// VC CREATED BY ISSUER
const xrpl = require('xrpl');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Issuer information
const issuerDid = 'did:xrpl:1:rBvPGAgiBQWeFz8MwXmXi3TLqptUf9ViFe';
const issuerPrivateKey = 'sEdVNQpbEszgeoRPe4o1pvnvqVqvGBf';

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
    const userDID = "did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ";
    const issuerDID = "did:xrpl:1:rffGVvdyzRxT1KJLs6K4ZaNj5LiDJGxNvu";
    const issuerPrivateKeyForAssertion = '0041A2F8C0D2CAFC0E2DDC6BD490F047B091FD6F2BEFA942E59C8AFEED91235667';

    const petProfile = {
        Name: "Wiwi",
        Species: "Dog",
        Breed: "Chihuahua",
        Sex: "M",
        Birthdate: "2023-01-01",
        Origin: "FR",
        Coat: "black and tan",
        EyesColor: "brown",
        PedigreeNumber: "44544444",
        IdIssueDate: "2024-06-05",
    };

    const vc = await createAndSignVC(issuerDID, userDID, issuerPrivateKeyForAssertion, petProfile);
    console.log(JSON.stringify(vc, null, 2));
}

main();
