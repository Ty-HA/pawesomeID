const { Client, Wallet } = require('xrpl');
const basex = require('base-x');
const chalk = require('chalk');
const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const bs58 = basex(BASE58);

let prefixPinata = "https://gateway.pinata.cloud/ipfs/";

// Generates a wallet from a given secret
async function generateWalletFromSecret(secret) {
    const wallet = Wallet.fromSecret(secret);
    return wallet;
}

// Fetches a DID document from the XRP Ledger
async function getDIDDocument(did) {
    const client = new Client("wss://s.devnet.rippletest.net:51233/");
    let address = did.substring(11); // Extracts the XRPL address from the DID

    try {
        await client.connect();
        const response = await client.request({
            command: "account_objects",
            account: address,
            ledger_index: "validated"
        });

        if (response.result.account_objects.length === 0) {
            console.log(chalk.yellow("No DID objects found for the provided DID."));
            return null;
        }

        const didDocumentHex = response.result.account_objects[0].DIDDocument;
        const prefixedHexString = "1220" + didDocumentHex;
        const buffer = Buffer.from(prefixedHexString, 'hex');
        const base58Encoded = bs58.encode(buffer);

        console.log(chalk.green(`Successfully retrieved the DID document for: ${did}`));
        console.log(chalk.blackBright(`  --> Value of DID Document: ${didDocumentHex}`));
        console.log(chalk.blue(`  --> Access the DID Document via IPFS at: ${prefixPinata + base58Encoded}\n`));

        return base58Encoded;
    } catch (error) {
        console.error(chalk.red(`Error fetching DID objects for address ${address}: ${error.message}`));
        return null;
    } finally {
        await client.disconnect();
    }
}

// Main function for fetching DID documents for given DIDs
async function main() {
    // const issuerDID = "did:xrpl:1:rffGVvdyzRxT1KJLs6K4ZaNj5LiDJGxNvu";
    const issuerDID = "did:xrpl:1:r9UVfG5LnWNMaCyHLWBHhrT37jUiuQ2azE";
    await getDIDDocument(issuerDID);

    const userDID = "did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ";
    await getDIDDocument(userDID);
}

// Run the main function and handle any exceptions
main().catch(error => console.error(chalk.redBright(`Critical error encountered: ${error}`)));
