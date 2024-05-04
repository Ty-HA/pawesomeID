import React, { useEffect, useState } from 'react';
import { Button } from "flowbite-react";

declare global {
  interface Window { Xumm: any; }
}

const XamanButton: React.FC = () => {
  const [account, setAccount] = useState('...');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://xumm.app/assets/cdn/xumm.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const xumm = new window.Xumm('your-api-key');

      xumm.on("ready", () => console.log("Ready (e.g. hide loading state of page)"));

      xumm.on("success", async () => {
        xumm.user.account.then((account: string) => {
          setAccount(account);
        });
      });

      xumm.on("logout", async () => {
        setAccount('...');
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1 id="accountaddress">{account}</h1>
      <Button id="signinbutton" onClick={() => window.Xumm.authorize()}>Login with Xaman</Button>
      <Button id="logoutbutton" onClick={() => window.Xumm.logout()}>Logout from Xaman</Button>
    </div>
  );
};

export default XamanButton;