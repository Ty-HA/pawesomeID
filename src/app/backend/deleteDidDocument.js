const { Client, Wallet } = require('xrpl');
const chalk = require('chalk');

// Generates a wallet using a given secret
async function generateWalletFromSecret(secret) {
    const wallet = Wallet.fromSecret(secret);
    return wallet;
}

// Sets a DID document on the XRP Ledger
async function DIDDelete(wallet) {
    const client = new Client("wss://s.devnet.rippletest.net:51233/");
    await client.connect();

    try {
        const prepared = await client.autofill({
            "TransactionType": "DIDDelete",
            "Account": wallet.address,
        });

        let signedTransaction = wallet.sign(prepared);

        const result = await client.submitAndWait(signedTransaction.tx_blob);
        console.log(chalk.blue(`Transaction result: ${JSON.stringify(result, null, 2)}`));
        return result;
    } catch (error) {
        console.error(chalk.red(`Error setting DID: ${error}`));
        return null;
    } finally {
        await client.disconnect();
    }
}

// Main function for wallet creation and DID setting on the XRP Ledger
async function main() {
    const userSecret = "sEdToXXs9NXwguHsJjbWi4bGVwtKqsP";
    let userWallet = await generateWalletFromSecret(userSecret);
    await DIDDelete(userWallet);
}

// Run the main function and handle any exceptions
main().catch(error => console.error(chalk.redBright(`Critical error encountered: ${error}`)));
