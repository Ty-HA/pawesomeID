"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Button } from "flowbite-react";

import RPC from "./viem"; // for using viem
// import RPC from "./web3RPC";
// import RPC from "./ethersRPC"; // for using ethers.js
// source here: https://github.dev/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/blockchain-connection-examples/evm-modal-example

// Providers
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

// Wallet Services
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

// Adapters
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
// import { WalletConnectV2Adapter, getWalletConnectV2Settings } from "@web3auth/wallet-connect-v2-adapter";
// import { MetamaskAdapter } from "@web3auth/metamask-adapter";
// import { TorusWalletAdapter, TorusWalletOptions } from "@web3auth/torus-evm-adapter";
// import { CoinbaseAdapter, CoinbaseAdapterOptions } from "@web3auth/coinbase-adapter";

// const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // testget from https://dashboard.web3auth.io

const clientId =
  "BLsAgZAaq1X0jFUxiKcWkMO9EjlA5Qb7HjVbWDdHLLHQsyovE9V9daN2ul08Sj9NxUG770uOeoKtYUS0pksWItY";

// chainConfig for Polygon Mainnet
const chainConfig = {
  chainId: "0x13882", // Please use 0x1 for ETH Mainnet, 0x89 for Polygon Mainnet
  rpcTarget: "https://rpc.ankr.com/polygon_amoy",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Polygon Amoy Testnet",
  blockExplorerUrl: "https://amoy.polygonscan.com/",
  ticker: "MATIC",
  tickerName: "MATIC",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
};

// chainConfig for Arbitrum Testnet
/*
const chainConfig = {  
  chainId: "0x66eee", // hex of 421611
  rpcTarget: "https://rpc.ankr.com/arbitrum_sepolia",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Arbitrum Testnet",
  blockExplorerUrl: "`https://sepolia-explorer.arbitrum.io`",
  ticker: "ETH",
  tickerName: "ETH",
  // logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
};
*/

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

// Web3auth popup modal options
const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  uiConfig: {
    uxMode: "redirect",
    appName: "W3A Heroes",
    appUrl: "https://web3auth.io/",
    theme: {
      primary: "#7ed6df",
    },
    logoLight: "https://web3auth.io/images/web3authlog.png",
    logoDark: "https://web3auth.io/images/web3authlogodark.png",
    defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
    mode: "auto", // whether to enable dark mode. defaultValue: auto
    useLogoLoader: true,
  },
  privateKeyProvider: privateKeyProvider,
  sessionTime: 86400, // 1 day
  // useCoreKitKey: true,
};

function UserAddress() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [walletServicesPlugin, setWalletServicesPlugin] =
    useState<WalletServicesPlugin | null>(null);

  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth(web3AuthOptions as Web3AuthOptions);

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional",
          },
          adapterSettings: {
            uxMode: "redirect", // "redirect" | "popup"
            whiteLabel: {
              logoLight: "https://web3auth.io/images/web3authlog.png",
              logoDark: "https://web3auth.io/images/web3authlogodark.png",
              defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
              mode: "dark", // whether to enable dark, light or auto mode. defaultValue: auto [ system theme]
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        // Wallet Services Plugin
        const walletServicesPlugin = new WalletServicesPlugin();
        setWalletServicesPlugin(walletServicesPlugin);
        web3auth.addPlugin(walletServicesPlugin);

        // read more about adapters here: https://web3auth.io/docs/sdk/pnp/web/adapters/

        // Only when you want to add External default adapters, which includes WalletConnect, Metamask, Torus EVM Wallet
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter) => {
          web3auth.configureAdapter(adapter);
        });

       

        setWeb3auth(web3auth);

        await web3auth.initModal();

     
        if (web3auth.connected) {
          // setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.connect();
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      // uiConsole("web3auth not initialized yet");
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    //uiConsole(idToken);
    console.log(idToken);
  };



  const getAccounts = async () => {
    if (!web3auth?.provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider as IProvider);
    const address = await rpc.getAccounts();
    // uiConsole(address);
    console.log(address);
  };

    const getPrivateKey = async () => {
    if (!web3auth?.provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider as IProvider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args: unknown[]): void {
    const el = document.querySelector("#console>p") as HTMLElement;
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      el.style.color = 'black'; // Set the color of the text to black
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        
        <div>
          <button onClick={authenticateUser} className="card text-black">
            Get ID Token
          </button>
        </div>
        
        
        <div>
          <button onClick={getAccounts} className="card text-black">
            Get Accounts
          </button>
        </div>    
       
       
       
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p className="card text-black" style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );


  return (
    <div className="container">
      
     
    </div>
  );
}

export default UserAddress;
