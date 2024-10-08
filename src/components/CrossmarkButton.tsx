import React, { useState, useEffect } from 'react';
import sdk from '@crossmarkio/sdk';
import { Button } from "flowbite-react";

interface CrossmarkButtonProps {
    title: string;
  }

const CrossmarkButton: React.FC<CrossmarkButtonProps> = ({title}) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connect = async () => {
      try {
        sdk.sync.isConnected();
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    };
    connect();
        
  }, []);

  // let userAddress = sdk.sync.signIn();
  // console.log(userAddress);

  const handleConnectWallet = async () => {
    let { request, response, createdAt, resolvedAt } = await sdk.methods.signInAndWait();
    setWalletAddress(response.data.address);
    setIsConnected(true);
  };

  const handleDisconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  

  return (
    <div>
      {!isConnected && <Button onClick={handleConnectWallet}>{title}</Button>}
      {isConnected && <Button onClick={handleDisconnectWallet}>Disconnect</Button>}
      {walletAddress && <h1>Wallet Address: {walletAddress}</h1>}
    </div>
  );
};

export default CrossmarkButton;