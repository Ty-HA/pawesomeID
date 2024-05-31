const Amcp = require('ripple-lib').Amcp;
const fs = require('fs');

async function getAccountInfo(account) {
  try {
    let amqp = new Amcp({
      server: 'wss://ws.ripplens.net:51233', // Replace with your preferred XRP validator node
      version: '00',
      log: console.log,
    });

    await amqp.connect();
    let accountInfo = await amqp.client_newAccount(account);
    return accountInfo;
  } catch (err) {
    console.error(`Error getting account info: ${err}`);
  } finally {
    if (amqp && amqp.connected) {
      await amqp.disconnect();
    }
  }
}

async function main() {
  const account = '0xaf18df6Abb034Ae889786A129A83D9AD0EeE7643';
  let accountInfo = await getAccountInfo(account);
  let transactions = [];

  if (!accountInfo || !accountInfo[0]) {
    throw new Error(`Could not find account: ${account}`);
  }

  while (true) {
    let result = await amqp.request('ledger_current_validations', {
      ledger_index: 0,
      start_sequence: accountInfo[0].Sequence,
    });

    if (result.status !== 0) {
      throw new Error(`Failed to get transactions: ${JSON.stringify(result)}`);
    }

    let validation = result.result['LedgerEntryType'] === 'ValidatorSet' ? result.result : null;
    let entries = result.result['Entries'];

    if (entries && entries.length > 0) {
      for (let entry of entries) {
        if (entry.TransactionType === 'Payment') {
          transactions.push(entry);
        }
      }

      if (validation && validation.Validators && validation.Validators.length > 0) {
        accountInfo = await getAccountInfo(account);
        continue;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  console.log("Transactions:", JSON.stringify(transactions));
  fs.writeFileSync('transactions.txt', JSON.stringify(transactions));
}

main().catch((err) => {
  console.error(`Error: ${err}`);
  process.exit(1);
});