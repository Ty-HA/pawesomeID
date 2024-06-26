const xrpl = require('xrpl');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Function to sign data with a private key
function signData(data, privateKey) {
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const signature = key.sign(data);
    const derSign = signature.toDER('hex');
    return derSign;
}

// Function to create and sign a Verifiable Presentation (VP)
function createVP(vc, verificationMethod, holderPrivateKey) {
    const vp = {
        "@context": "https://www.w3.org/2018/credentials/v1",
        "type": "VerifiablePresentation",
        "verifiableCredential": [vc]
    };

    // Create a challenge and domain for VP proof
    const challenge = "4b7bb9630a3f83384eb940473a99e30b51f9890b4afada73f9c17b847381806f"; 
    const domain = "http://xyz:5001/api/v1/auth/vp-signin";
    const vpString = JSON.stringify(vp) + challenge + domain;

    // Sign the VP data with the holder's private key
    const signed = signData(vpString, holderPrivateKey);
    vp['proof'] = {
        "type": "EcdsaSecp256k1RecoveryMethod2020",
        "created": new Date().toISOString(),
        "proofPurpose": "authentication",
        "verificationMethod": verificationMethod,
        "challenge": challenge,
        "domain": domain,
        "signature": signed
    };

    return vp;
}

// Main function to create and sign a Verifiable Presentation (VP)
async function main() {
    const userVC = {
        "@context": "https://www.w3.org/2018/credentials/v1",
        "type": ["VerifiableCredential"],
        "issuer": "did:xrpl:1:rffGVvdyzRxT1KJLs6K4ZaNj5LiDJGxNvu",
        "issuanceDate": "2024-04-25T13:30:08.916Z",
        "credentialSubject": {
            "id": "did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ",
            "pet": {
                "Name": "Wiwi",
                "Species": "Dog",
                "Breed": "Chihuahua",
                "Sex": "M",
                "Birthdate": "2023-01-01",
                "Origin": "FR",
                "Coat": "black and tan",
                "EyesColor": "brown",
                "PedigreeNumber": "44544444",
                "IdIssueDate": "2024-06-05",
            }
        },
        "proof": {
            "type": "EcdsaSecp256k1RecoveryMethod2020",
            "created": "2024-06-13T17:15:07.567Z",
            "proofPurpose": "assertionMethod",
            "verificationMethod": "did:xrpl:1:rffGVvdyzRxT1KJLs6K4ZaNj5LiDJGxNvu#keys-1",
            "signature": "304502205ff2a72c8d51b23be64e6c5a59b15c4b9868b6b165f591bb5ae2e2fd7aec609d022100f05d21d38ffce93a974043f1654bb621f3418cbea48bf7130c8cfa069d92ac10"
        }
    };

    const userVerificationMethod = "did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ#keys-1";
    const userPrivateKeyForAssertion = '0041A2F8C0D2CAFC0E2DDC6BD490F047B091FD6F2BEFA942E59C8AFEED91235667';

    const vp = createVP(userVC, userVerificationMethod, userPrivateKeyForAssertion);
    console.log(JSON.stringify(vp, null, 2));
}

main();
