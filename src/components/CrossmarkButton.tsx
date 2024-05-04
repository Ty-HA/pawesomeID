import React from 'react';
import sdk from '@crossmarkio/sdk';
import { Button } from "flowbite-react";


const CrossmarkButton: React.FC = () => {
  const [walletAddress, setWalletAddress] = React.useState('');

  const handleConnectWallet = async () => {
    let { request, response, createdAt, resolvedAt } = await sdk.methods.signInAndWait();
    setWalletAddress(response.data.address);
  };

  return (
    <div>
      <Button onClick={handleConnectWallet}>Se connecter au wallet XRPL</Button>
      {walletAddress && <h1>Adresse du wallet: {walletAddress}</h1>}
    </div>
  );
};

export default CrossmarkButton;